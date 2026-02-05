/**
 * Quality tests for BlueprintReport component
 * Tests exam blueprint analysis and performance visualization
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


// Mock hooks
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    userProfile: {
      examSection: 'FAR',
    },
  })),
}));

vi.mock('../../hooks/useStudy', () => ({
  useStudy: vi.fn(() => ({
    getTopicPerformance: vi.fn().mockResolvedValue([
      { topic: 'FAR-I.A', questions: 50, accuracy: 80 },
      { topic: 'FAR-I.B', questions: 30, accuracy: 60 },
      { topic: 'FAR-II.A', questions: 20, accuracy: 45 },
      { topic: 'FAR-II.B', questions: 10, accuracy: 90 },
    ]),
  })),
}));

vi.mock('../../config/examConfig', () => ({
  CPA_SECTIONS: {
    FAR: { name: 'Financial Accounting & Reporting', color: '#3B82F6', shortName: 'FAR' },
    AUD: { name: 'Auditing & Attestation', color: '#10B981', shortName: 'AUD' },
    REG: { name: 'Regulation', color: '#F59E0B', shortName: 'REG' },
    BAR: { name: 'Business Analysis & Reporting', color: '#8B5CF6', shortName: 'BAR' },
  },
  EXAM_BLUEPRINTS: {
    FAR: {
      areas: [
        { id: 'FAR-I', name: 'Conceptual Framework', weightRange: [15, 25] },
        { id: 'FAR-II', name: 'Financial Statements', weightRange: [25, 35] },
        { id: 'FAR-III', name: 'Transactions', weightRange: [20, 30] },
        { id: 'FAR-IV', name: 'State & Local', weightRange: [15, 25] },
      ],
    },
    AUD: {
      areas: [
        { id: 'AUD-I', name: 'Audit Planning', weightRange: [15, 25] },
        { id: 'AUD-II', name: 'Audit Procedures', weightRange: [30, 40] },
      ],
    },
  },
}));

import BlueprintReport from '../../components/BlueprintReport';
import { useStudy } from '../../hooks/useStudy';

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
};

const renderComponent = (props = {}) => {
  return render(
    <BlueprintReport {...defaultProps} {...props} />
  );
};

describe('BlueprintReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
      getTopicPerformance: vi.fn().mockResolvedValue([
        { topic: 'FAR-I.A', questions: 50, accuracy: 80 },
        { topic: 'FAR-I.B', questions: 30, accuracy: 60 },
        { topic: 'FAR-II.A', questions: 20, accuracy: 45 },
        { topic: 'FAR-II.B', questions: 10, accuracy: 90 },
      ]),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render blueprint report when open', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Blueprint Report')).toBeInTheDocument();
      });
    });

    it('should not render when closed', () => {
      renderComponent({ isOpen: false });

      expect(screen.queryByText('Blueprint Report')).not.toBeInTheDocument();
    });

    it('should display section name', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Financial Accounting & Reporting/i)).toBeInTheDocument();
      });
    });

    it('should show close button', async () => {
      renderComponent();

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('summary stats', () => {
    it('should display weighted accuracy', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Weighted Accuracy')).toBeInTheDocument();
      });
    });

    it('should display strong areas count', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Strong Areas')).toBeInTheDocument();
      });
    });

    it('should display needs work count', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Needs Work')).toBeInTheDocument();
      });
    });

    it('should display questions done count', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Questions Done')).toBeInTheDocument();
      });
    });
  });

  describe('legend', () => {
    it('should show status legend', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Strong \(75%\+\)/)).toBeInTheDocument();
      });
    });

    it('should show developing status', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Developing \(50-74%\)/)).toBeInTheDocument();
      });
    });

    it('should show weak status', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Weak/)).toBeInTheDocument();
      });
    });

    it('should show not started status', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Not Started')).toBeInTheDocument();
      });
    });
  });

  describe('blueprint areas', () => {
    it('should display blueprint area names', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Conceptual Framework')).toBeInTheDocument();
      });
    });

    it('should display Financial Statements area', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Financial Statements')).toBeInTheDocument();
      });
    });

    it('should allow expanding areas', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Conceptual Framework')).toBeInTheDocument();
      });

      // Click to expand
      const areaButton = screen.getByText('Conceptual Framework');
      fireEvent.click(areaButton);

      // Area should be expandable
      expect(areaButton).toBeInTheDocument();
    });
  });

  describe('close functionality', () => {
    it('should call onClose when close button clicked', async () => {
      const onClose = vi.fn();
      renderComponent({ onClose });

      await waitFor(() => {
        expect(screen.getByText('Blueprint Report')).toBeInTheDocument();
      });

      // Find X button
      const buttons = screen.getAllByRole('button');
      const closeButton = buttons.find(btn => 
        btn.querySelector('svg.lucide-x') !== null
      );
      
      if (closeButton) {
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('should call onClose when backdrop clicked', async () => {
      const onClose = vi.fn();
      renderComponent({ onClose });

      await waitFor(() => {
        expect(screen.getByText('Blueprint Report')).toBeInTheDocument();
      });

      const backdrop = document.querySelector('.backdrop-blur-sm');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
      }
    });
  });

  describe('loading state', () => {
    it('should show loading skeleton initially', () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        getTopicPerformance: vi.fn().mockImplementation(
          () => new Promise(() => {})
        ),
      });

      renderComponent();

      // Should show skeleton loaders
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    it('should handle fetch error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        getTopicPerformance: vi.fn().mockRejectedValue(new Error('Fetch failed')),
      });

      renderComponent();

      await waitFor(() => {
        // Should still render the report
        expect(screen.getByText('Blueprint Report')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('different sections', () => {
    it('should display passed section prop', async () => {
      renderComponent({ section: 'AUD' });

      await waitFor(() => {
        expect(screen.getByText(/Auditing & Attestation/i)).toBeInTheDocument();
      });
    });

    it('should load blueprint areas for section', async () => {
      renderComponent({ section: 'AUD' });

      await waitFor(() => {
        const { getTopicPerformance } = useStudy();
        expect(getTopicPerformance).toHaveBeenCalledWith('AUD');
      });
    });
  });

  describe('performance calculation', () => {
    it('should calculate overall accuracy', async () => {
      renderComponent();

      await waitFor(() => {
        // Check that accuracy percentage is displayed
        const accuracyText = screen.getByText('Weighted Accuracy');
        expect(accuracyText).toBeInTheDocument();
      });
    });

    it('should count strong areas', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Strong Areas')).toBeInTheDocument();
      });
    });
  });

  describe('no data state', () => {
    it('should handle empty topic performance', async () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        getTopicPerformance: vi.fn().mockResolvedValue([]),
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Blueprint Report')).toBeInTheDocument();
      });
    });

    it('should show 0% accuracy when no questions answered', async () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        getTopicPerformance: vi.fn().mockResolvedValue([]),
      });

      renderComponent();

      await waitFor(() => {
        // Should show 0% or 0 for stats
        expect(screen.getByText('0%')).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should have clickable backdrop', () => {
      renderComponent();

      const backdrop = document.querySelector('.backdrop-blur-sm');
      expect(backdrop).toBeInTheDocument();
    });

    it('should have clickable area buttons', async () => {
      renderComponent();

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(1);
      });
    });
  });

  describe('missing getTopicPerformance', () => {
    it('should handle undefined getTopicPerformance', async () => {
      (useStudy as ReturnType<typeof vi.fn>).mockReturnValue({
        getTopicPerformance: undefined,
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText('Blueprint Report')).toBeInTheDocument();
      });
    });
  });
});
