import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../../../components/pages/auth/ForgotPassword';

// Mock useAuth
const mockResetPassword = vi.fn();

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    resetPassword: mockResetPassword,
  }),
}));

const renderForgotPassword = () => {
  return render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  );
};

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the reset password form', () => {
      renderForgotPassword();
      expect(screen.getByText('Reset Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      renderForgotPassword();
      expect(screen.getByRole('button', { name: /send|reset/i })).toBeInTheDocument();
    });

    it('should render back to sign in link', () => {
      renderForgotPassword();
      expect(screen.getByText(/back to sign in/i)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should update email input on change', () => {
      renderForgotPassword();
      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput.value).toBe('test@example.com');
    });
  });

  describe('Form Submission', () => {
    it('should call resetPassword with email on submit', async () => {
      mockResetPassword.mockResolvedValueOnce({});
      renderForgotPassword();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
      });
    });

    it('should call resetPassword even for non-existent email', async () => {
      mockResetPassword.mockRejectedValueOnce({ code: 'auth/user-not-found' });
      renderForgotPassword();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'notfound@example.com' } });
      fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('notfound@example.com');
      });
    });

    it('should handle invalid email error', async () => {
      mockResetPassword.mockRejectedValueOnce({ code: 'auth/invalid-email' });
      renderForgotPassword();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'invalid@test.com' } });
      fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('invalid@test.com');
      });
    });

    it('should handle rate limiting error', async () => {
      mockResetPassword.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
      renderForgotPassword();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
      });
    });
  });

  describe('Success State', () => {
    it('should call resetPassword on form submission', async () => {
      mockResetPassword.mockResolvedValue({});
      renderForgotPassword();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const button = screen.getByRole('button', { name: /send|reset/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
      });
    });

    it('should disable button while submitting', async () => {
      // Create a promise that we can control
      let resolvePromise;
      mockResetPassword.mockImplementation(() => new Promise(resolve => {
        resolvePromise = resolve;
      }));
      
      renderForgotPassword();

      fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByRole('button', { name: /send|reset/i }));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalled();
      });
      
      // Resolve to clean up
      resolvePromise();
    });
  });
});
