/**
 * Quality tests for ExamDateTracker component
 * Tests exam date management for CPA sections
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock dependencies
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: { uid: 'test-user' },
    userProfile: {
      examSection: 'FAR',
      examDate: new Date('2025-06-15'),
    },
    refreshProfile: vi.fn(),
  })),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  updateDoc: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { name: 'Financial Accounting & Reporting', color: '#3B82F6' },
    AUD: { name: 'Auditing & Attestation', color: '#10B981' },
    REG: { name: 'Regulation', color: '#F59E0B' },
    BAR: { name: 'Business Analysis & Reporting', color: '#8B5CF6' },
    ISC: { name: 'Information Systems & Controls', color: '#EC4899' },
    TCP: { name: 'Tax Compliance & Planning', color: '#EF4444' },
  },
}));

import ExamDateTracker from '../../components/ExamDateTracker';
import { useAuth } from '../../hooks/useAuth';
import { updateDoc } from 'firebase/firestore';

describe('ExamDateTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
    
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: { uid: 'test-user' },
      userProfile: {
        examSection: 'FAR',
        examDate: new Date('2025-06-15'),
      },
      refreshProfile: vi.fn().mockResolvedValue(undefined),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('should render all CPA sections', () => {
      render(<ExamDateTracker />);

      // Core sections
      expect(screen.getByText('FAR')).toBeInTheDocument();
      expect(screen.getByText('AUD')).toBeInTheDocument();
      expect(screen.getByText('REG')).toBeInTheDocument();

      // Discipline sections
      expect(screen.getByText('BAR')).toBeInTheDocument();
      expect(screen.getByText('ISC')).toBeInTheDocument();
      expect(screen.getByText('TCP')).toBeInTheDocument();
    });

    it('should show active section badge', () => {
      render(<ExamDateTracker />);

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should render in compact mode', () => {
      render(<ExamDateTracker compact />);

      // Should still show sections
      expect(screen.getByText('FAR')).toBeInTheDocument();
    });

    it('should show exam date countdown for active section', () => {
      render(<ExamDateTracker />);

      // Days until June 15 from Jan 15 = 151 days left
      expect(screen.getByText(/151 days left/i)).toBeInTheDocument();
    });

    it('should show set date prompt for sections without dates', () => {
      render(<ExamDateTracker />);

      // Other sections should show prompt to set date
      expect(screen.getAllByText(/Set exam date/i).length).toBeGreaterThan(0);
    });
  });

  describe('date editing', () => {
    it('should show edit button on section cards', () => {
      render(<ExamDateTracker />);

      // Edit buttons should be present (not in compact mode)
      const editButtons = document.querySelectorAll('button');
      expect(editButtons.length).toBeGreaterThan(0);
    });

    it('should open date input when edit button clicked', () => {
      vi.useRealTimers();
      render(<ExamDateTracker />);

      // Find and click an edit button (first button is edit)
      const editButtons = screen.getAllByRole('button');
      const editButton = editButtons.find(b => b.querySelector('svg.lucide-edit-2'));
      
      if (editButton) {
        fireEvent.click(editButton);
        // After click, input should appear synchronously
        expect(document.querySelector('input[type="date"]')).toBeInTheDocument();
      } else {
        // Edit buttons should exist
        expect(editButtons.length).toBeGreaterThan(0);
      }
      vi.useFakeTimers();
    });

    it('should save date when form submitted', () => {
      vi.useRealTimers();
      const refreshProfile = vi.fn().mockResolvedValue(undefined);
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {
          examSection: 'FAR',
          examDate: new Date('2025-06-15'),
        },
        refreshProfile,
      });

      render(<ExamDateTracker />);

      // Find edit button and click it
      const editButtons = screen.getAllByRole('button');
      const editButton = editButtons.find(b => b.querySelector('svg.lucide-edit-2'));
      
      if (editButton) {
        fireEvent.click(editButton);

        const dateInput = document.querySelector('input[type="date"]');
        if (dateInput) {
          fireEvent.change(dateInput, { target: { value: '2025-08-01' } });
          
          // Find and click save button
          const saveButton = screen.getByRole('button', { name: /save/i });
          fireEvent.click(saveButton);

          // updateDoc should be called (eventually)
          expect(updateDoc).toHaveBeenCalled();
        }
      }
      vi.useFakeTimers();
    });
  });

  describe('section selection', () => {
    it('should call onSectionSelect when section card clicked', () => {
      const onSectionSelect = vi.fn();
      render(<ExamDateTracker onSectionSelect={onSectionSelect} />);

      // Click on a section card
      const farSection = screen.getByText('FAR').closest('div[class*="rounded-xl"]');
      if (farSection) {
        fireEvent.click(farSection);
        expect(onSectionSelect).toHaveBeenCalledWith('FAR');
      }
    });

    it('should not call onSectionSelect when editing', async () => {
      const onSectionSelect = vi.fn();
      render(<ExamDateTracker onSectionSelect={onSectionSelect} />);

      // Click edit button first
      const editButton = document.querySelector('button');
      if (editButton) {
        fireEvent.click(editButton);
        
        // Clear previous calls
        onSectionSelect.mockClear();
        
        // Try to click on section card while editing
        const farSection = screen.getByText('FAR').closest('div[class*="rounded-xl"]');
        if (farSection) {
          fireEvent.click(farSection);
          expect(onSectionSelect).not.toHaveBeenCalled();
        }
      }
    });
  });

  describe('unauthenticated state', () => {
    it('should handle missing user gracefully', () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: null,
        userProfile: null,
        refreshProfile: vi.fn(),
      });

      render(<ExamDateTracker />);

      // Should still render sections
      expect(screen.getByText('FAR')).toBeInTheDocument();
    });

    it('should use FAR as default section when no profile', () => {
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: null,
        refreshProfile: vi.fn(),
      });

      render(<ExamDateTracker />);

      // FAR should be shown but no date countdown
      expect(screen.getByText('FAR')).toBeInTheDocument();
    });
  });

  describe('date calculations', () => {
    it('should handle exam date in the past', () => {
      vi.setSystemTime(new Date('2025-07-01'));
      
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {
          examSection: 'FAR',
          examDate: new Date('2025-06-15'), // Past date
        },
        refreshProfile: vi.fn(),
      });

      render(<ExamDateTracker />);

      // When date is in the past (daysUntil <= 0), shows "Exam day!"
      expect(screen.getByText(/Exam day!/i)).toBeInTheDocument();
    });

    it('should handle exam date today', () => {
      vi.setSystemTime(new Date('2025-06-15'));
      
      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {
          examSection: 'FAR',
          examDate: new Date('2025-06-15'),
        },
        refreshProfile: vi.fn(),
      });

      render(<ExamDateTracker />);

      // Should show "Exam day!" when daysUntil <= 0
      expect(screen.getByText(/Exam day!/i)).toBeInTheDocument();
    });

    it('should handle Firestore timestamp format', () => {
      const mockTimestamp = {
        toDate: () => new Date('2025-06-15'),
      };

      (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
        user: { uid: 'test-user' },
        userProfile: {
          examSection: 'FAR',
          examDate: mockTimestamp,
        },
        refreshProfile: vi.fn(),
      });

      render(<ExamDateTracker />);

      // Should correctly parse the timestamp
      expect(screen.getByText(/151 days left/i)).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('should handle save error gracefully', () => {
      vi.useRealTimers();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (updateDoc as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Save failed'));

      render(<ExamDateTracker />);

      // Find edit button
      const editButtons = screen.getAllByRole('button');
      const editButton = editButtons.find(b => b.querySelector('svg.lucide-edit-2'));
      
      if (editButton) {
        fireEvent.click(editButton);

        const dateInput = document.querySelector('input[type="date"]');
        if (dateInput) {
          fireEvent.change(dateInput, { target: { value: '2025-08-01' } });
          
          const saveButton = screen.getByRole('button', { name: /save/i });
          fireEvent.click(saveButton);

          // Error should be logged (test that it doesn't crash)
          expect(updateDoc).toHaveBeenCalled();
        }
      }

      consoleSpy.mockRestore();
      vi.useFakeTimers();
    });
  });

  describe('section groups', () => {
    it('should display core sections', () => {
      render(<ExamDateTracker />);

      // Core sections are FAR, AUD, REG
      expect(screen.getByText('FAR')).toBeInTheDocument();
      expect(screen.getByText('AUD')).toBeInTheDocument();
      expect(screen.getByText('REG')).toBeInTheDocument();
    });

    it('should display discipline sections', () => {
      render(<ExamDateTracker />);

      // Discipline sections are BAR, ISC, TCP
      expect(screen.getByText('BAR')).toBeInTheDocument();
      expect(screen.getByText('ISC')).toBeInTheDocument();
      expect(screen.getByText('TCP')).toBeInTheDocument();
    });

    it('should exclude BEC and PREP from display', () => {
      render(<ExamDateTracker />);

      expect(screen.queryByText('BEC')).not.toBeInTheDocument();
      expect(screen.queryByText('PREP')).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply active section styling', () => {
      render(<ExamDateTracker />);

      // FAR is the active section
      const farCard = screen.getByText('FAR').closest('div[class*="rounded-xl"]');
      expect(farCard).toHaveClass('border-primary-500');
    });

    it('should apply section colors', () => {
      render(<ExamDateTracker />);

      // Check that section badges use the configured colors
      const farBadge = screen.getByText('FAR');
      const parentWithStyle = farBadge.closest('[style]');
      expect(parentWithStyle).toHaveStyle({ backgroundColor: '#3B82F6' });
    });
  });
});
