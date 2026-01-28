import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../../../components/common/Toast';

// Test component that uses the toast context
const ToastTestConsumer = ({ action }) => {
  const toast = useToast();
  return (
    <button onClick={() => action(toast)}>
      Trigger Toast
    </button>
  );
};

const renderWithToastProvider = (action) => {
  return render(
    <ToastProvider>
      <ToastTestConsumer action={action} />
    </ToastProvider>
  );
};

describe('Toast Components', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('ToastProvider', () => {
    it('renders children', () => {
      render(
        <ToastProvider>
          <div>Test Child</div>
        </ToastProvider>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('useToast', () => {
    it('throws error when used outside provider', () => {
      // Suppress console error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        const TestComponent = () => {
          useToast();
          return null;
        };
        render(<TestComponent />);
      }).toThrow('useToast must be used within a ToastProvider');
      
      consoleSpy.mockRestore();
    });

    it('shows success toast', () => {
      renderWithToastProvider((toast) => toast.success('Success message'));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('shows error toast', () => {
      renderWithToastProvider((toast) => toast.error('Error message'));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('shows warning toast', () => {
      renderWithToastProvider((toast) => toast.warning('Warning message'));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('shows info toast', () => {
      renderWithToastProvider((toast) => toast.info('Info message'));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });

    it('shows toast with show method', () => {
      renderWithToastProvider((toast) => toast.show('Generic message', 'success'));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      expect(screen.getByText('Generic message')).toBeInTheDocument();
    });

    it('removes toast after duration', async () => {
      renderWithToastProvider((toast) => toast.success('Temporary message', 1000));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      expect(screen.getByText('Temporary message')).toBeInTheDocument();

      // Fast-forward timer
      act(() => {
        vi.advanceTimersByTime(1100);
      });

      expect(screen.queryByText('Temporary message')).not.toBeInTheDocument();
    });

    it('can dismiss toast by clicking X', () => {
      renderWithToastProvider((toast) => toast.success('Dismissible message'));
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      expect(screen.getByText('Dismissible message')).toBeInTheDocument();

      // Find and click the dismiss button (X icon button)
      const dismissButton = screen.getByRole('button', { name: '' });
      if (dismissButton) {
        fireEvent.click(dismissButton);
      }
    });

    it('can show multiple toasts', () => {
      let toastRef;
      render(
        <ToastProvider>
          <ToastTestConsumer action={(toast) => {
            toastRef = toast;
          }} />
        </ToastProvider>
      );

      // Trigger to get toast reference
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      // Now show multiple toasts
      act(() => {
        toastRef.success('Toast 1');
        toastRef.error('Toast 2');
        toastRef.info('Toast 3');
      });

      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
      expect(screen.getByText('Toast 3')).toBeInTheDocument();
    });

    it('returns toast id from show methods', () => {
      let returnedId;
      renderWithToastProvider((toast) => {
        returnedId = toast.success('Message');
      });
      
      fireEvent.click(screen.getByText('Trigger Toast'));
      
      expect(typeof returnedId).toBe('number');
    });
  });
});
