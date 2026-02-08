import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Study from '../../../components/pages/Study';

// Mock hooks
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    userProfile: {
      examSection: 'REG',
      displayName: 'Test User',
    },
  }),
}));

vi.mock('../../../hooks/useStudy', () => ({
  useStudy: () => ({
    todayLog: { questionsAnswered: 25, lessonsCompleted: 2 },
    dailyProgress: 70,
    dailyGoalMet: false,
  }),
}));

vi.mock('../../../providers/CourseProvider', () => ({
  useCourse: () => ({
    courseId: 'cpa',
    course: {
      id: 'cpa',
      name: 'CPA',
      hasTBS: true,
      sections: [
        { id: 'FAR', name: 'Financial Accounting & Reporting', shortName: 'FAR' },
        { id: 'AUD', name: 'Auditing & Attestation', shortName: 'AUD' },
        { id: 'REG', name: 'Regulation', shortName: 'REG' },
      ],
    },
  }),
}));

const renderStudy = () => {
  return render(
    <BrowserRouter>
      <Study />
    </BrowserRouter>
  );
};

describe('Study Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render study mode cards', () => {
      renderStudy();
      expect(screen.getByText(/continue learning/i)).toBeInTheDocument();
    });

    it('should display study modes', () => {
      renderStudy();
      expect(screen.getByText(/continue learning/i)).toBeInTheDocument();
      expect(screen.getByText(/practice questions/i)).toBeInTheDocument();
    });

    it('should show task-based simulations option', () => {
      renderStudy();
      expect(screen.getByText(/task-based simulations/i)).toBeInTheDocument();
    });

    it('should display daily progress section', () => {
      renderStudy();
      // Check for any progress indicators
      const progressElements = screen.getAllByText(/progress|questions|today/i);
      expect(progressElements.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Links', () => {
    it('should have link to lessons', () => {
      renderStudy();
      const lessonLink = screen.getByRole('link', { name: /continue learning/i });
      expect(lessonLink).toHaveAttribute('href', '/lessons');
    });

    it('should have link to practice', () => {
      renderStudy();
      const practiceLink = screen.getByRole('link', { name: /practice questions/i });
      expect(practiceLink).toHaveAttribute('href', '/practice');
    });

    it('should have link to TBS', () => {
      renderStudy();
      const tbsLink = screen.getByRole('link', { name: /task-based simulations/i });
      expect(tbsLink).toHaveAttribute('href', '/tbs');
    });
  });

  describe('User Section Display', () => {
    it('should display the current exam section', () => {
      renderStudy();
      expect(screen.getByText(/reg/i)).toBeInTheDocument();
    });
  });
});
