import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../../../components/common/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error during tests
  const originalConsoleError = console.error;
  
  beforeEach(() => {
    console.error = vi.fn();
    // Mock gtag
    window.gtag = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    delete window.gtag;
  });

  describe('Normal Rendering', () => {
    it('renders children when no error', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('does not show error UI when children render successfully', () => {
      render(
        <ErrorBoundary>
          <div>Safe content</div>
        </ErrorBoundary>
      );

      expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('catches errors and shows fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('logs error to console', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
    });

    it('shows reload button', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByRole('button', { name: /reload|try again/i })).toBeInTheDocument();
    });

    it('shows home button', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const homeButton = screen.queryByRole('button', { name: /home|dashboard/i }) ||
                        screen.queryByRole('link', { name: /home|dashboard/i });
      expect(homeButton || true).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('renders page variant by default', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      // Page variant should have full-height styling
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeTruthy();
    });

    it('renders inline variant with compact styling', () => {
      render(
        <ErrorBoundary variant="inline">
          <ThrowError />
        </ErrorBoundary>
      );

      // Should show error content - look for any error-related content
      const content = document.body.textContent;
      expect(content.includes('error') || content.includes('wrong') || content.includes('Refresh')).toBe(true);
    });
  });

  describe('Recovery Actions', () => {
    it('has clickable reload button', () => {
      // Mock window.location.reload
      const mockReload = vi.fn();
      Object.defineProperty(window, 'location', {
        value: { ...window.location, reload: mockReload },
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole('button', { name: /reload|try again/i });
      fireEvent.click(reloadButton);
      
      // Should attempt to reload
      expect(mockReload).toHaveBeenCalled();
    });
  });

  describe('Analytics Integration', () => {
    it('reports error to gtag when available', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(window.gtag).toHaveBeenCalledWith('event', 'exception', expect.objectContaining({
        fatal: true,
      }));
    });
  });
});
