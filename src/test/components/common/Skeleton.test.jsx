import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonCard, SkeletonQuestion, SkeletonDashboard } from '../../../components/common/Skeleton';

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('renders with default class', () => {
      const { container } = render(<Skeleton data-testid="skeleton" />);
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Skeleton className="h-10 w-full" />);
      expect(container.querySelector('.h-10')).toBeInTheDocument();
    });

    it('passes additional props', () => {
      render(<Skeleton data-testid="custom-skeleton" role="status" />);
      expect(screen.getByTestId('custom-skeleton')).toHaveAttribute('role', 'status');
    });
  });

  describe('SkeletonText', () => {
    it('renders default 3 lines', () => {
      const { container } = render(<SkeletonText />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons).toHaveLength(3);
    });

    it('renders specified number of lines', () => {
      const { container } = render(<SkeletonText lines={5} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons).toHaveLength(5);
    });

    it('renders single line', () => {
      const { container } = render(<SkeletonText lines={1} />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons).toHaveLength(1);
    });

    it('applies custom className', () => {
      const { container } = render(<SkeletonText className="mt-4" />);
      expect(container.firstChild).toHaveClass('mt-4');
    });
  });

  describe('SkeletonCard', () => {
    it('renders card skeleton with elements', () => {
      const { container } = render(<SkeletonCard />);
      expect(container.querySelector('.card')).toBeInTheDocument();
      expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    });

    it('applies custom className', () => {
      const { container } = render(<SkeletonCard className="mb-4" />);
      expect(container.firstChild).toHaveClass('mb-4');
    });
  });

  describe('SkeletonQuestion', () => {
    it('renders question skeleton', () => {
      const { container } = render(<SkeletonQuestion />);
      expect(container.querySelector('.card')).toBeInTheDocument();
    });

    it('has multiple skeleton elements', () => {
      const { container } = render(<SkeletonQuestion />);
      expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    });
  });

  describe('SkeletonDashboard', () => {
    it('renders dashboard skeleton', () => {
      const { container } = render(<SkeletonDashboard />);
      expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    });

    it('renders card skeleton elements', () => {
      const { container } = render(<SkeletonDashboard />);
      expect(container.querySelectorAll('.card').length).toBeGreaterThan(0);
    });
  });
});
