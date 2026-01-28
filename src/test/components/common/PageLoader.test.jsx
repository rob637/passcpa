import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageLoader, SpinnerLoader, FullPageLoader, CardLoader } from '../../../components/common/PageLoader';

describe('PageLoader Components', () => {
  describe('PageLoader', () => {
    it('renders page skeleton with animation', () => {
      const { container } = render(<PageLoader />);
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('renders header skeleton', () => {
      const { container } = render(<PageLoader />);
      expect(container.querySelector('.h-8')).toBeInTheDocument();
    });

    it('renders card skeletons', () => {
      const { container } = render(<PageLoader />);
      // Should have 3 card skeletons
      const cards = container.querySelectorAll('.shadow-soft');
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });

    it('applies custom className', () => {
      const { container } = render(<PageLoader className="my-custom-class" />);
      expect(container.firstChild).toHaveClass('my-custom-class');
    });
  });

  describe('SpinnerLoader', () => {
    it('renders spinner with default size', () => {
      const { container } = render(<SpinnerLoader />);
      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
      expect(container.querySelector('.h-10')).toBeInTheDocument();
    });

    it('renders small spinner', () => {
      const { container } = render(<SpinnerLoader size="sm" />);
      expect(container.querySelector('.h-6')).toBeInTheDocument();
    });

    it('renders medium spinner', () => {
      const { container } = render(<SpinnerLoader size="md" />);
      expect(container.querySelector('.h-10')).toBeInTheDocument();
    });

    it('renders large spinner', () => {
      const { container } = render(<SpinnerLoader size="lg" />);
      expect(container.querySelector('.h-12')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<SpinnerLoader className="bg-white" />);
      expect(container.firstChild).toHaveClass('bg-white');
    });
  });

  describe('FullPageLoader', () => {
    it('renders full page loader', () => {
      const { container } = render(<FullPageLoader />);
      expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
    });

    it('displays loading text', () => {
      render(<FullPageLoader />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('has spinner animation', () => {
      const { container } = render(<FullPageLoader />);
      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
    });
  });

  describe('CardLoader', () => {
    it('renders default 3 rows', () => {
      const { container } = render(<CardLoader />);
      const rows = container.querySelectorAll('.mb-2');
      expect(rows).toHaveLength(3);
    });

    it('renders specified number of rows', () => {
      const { container } = render(<CardLoader rows={5} />);
      const rows = container.querySelectorAll('.mb-2');
      expect(rows).toHaveLength(5);
    });

    it('has animation', () => {
      const { container } = render(<CardLoader />);
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });
});
