import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../components/pages/auth/Login';

// Mock useAuth
const mockSignIn = vi.fn();
const mockSignInWithGoogle = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signInWithGoogle: mockSignInWithGoogle,
    loading: false,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the login form', () => {
      renderLogin();
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    });

    it('should render sign in button', () => {
      renderLogin();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render Google sign in button', () => {
      renderLogin();
      expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
    });

    it('should render forgot password link', () => {
      renderLogin();
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    });

    it('should render register link', () => {
      renderLogin();
      expect(screen.getByText(/sign up|register|create/i)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should update email input on change', () => {
      renderLogin();
      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput.value).toBe('test@example.com');
    });

    it('should update password input on change', () => {
      renderLogin();
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      expect(passwordInput.value).toBe('password123');
    });

    it('should toggle password visibility', () => {
      renderLogin();
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      expect(passwordInput.type).toBe('password');

      // Find toggle buttons (there may be multiple)
      const buttons = screen.getAllByRole('button');
      const toggleButton = buttons.find(btn => !btn.textContent?.trim());
      if (toggleButton) {
        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe('text');
      }
    });
  });

  describe('Form Submission', () => {
    it('should call signIn with email and password on submit', async () => {
      mockSignIn.mockResolvedValueOnce({});
      renderLogin();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should navigate to dashboard on successful login', async () => {
      mockSignIn.mockResolvedValueOnce({});
      renderLogin();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should display error for invalid credentials', async () => {
      mockSignIn.mockRejectedValueOnce({ code: 'auth/invalid-credential' });
      renderLogin();

      const emailInput = screen.getByPlaceholderText(/you@example.com/i);
      const passwordInput = screen.getByPlaceholderText(/enter your password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
      });
    });

    it('should display error for user not found', async () => {
      mockSignIn.mockRejectedValueOnce({ code: 'auth/user-not-found' });
      renderLogin();

      fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'notfound@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'password' } });
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/no account found/i)).toBeInTheDocument();
      });
    });

    it('should display error for too many requests', async () => {
      mockSignIn.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
      renderLogin();

      fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'password' } });
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(/too many failed attempts/i)).toBeInTheDocument();
      });
    });
  });

  describe('Google Sign In', () => {
    it('should call signInWithGoogle on Google button click', async () => {
      mockSignInWithGoogle.mockResolvedValueOnce({});
      renderLogin();

      const googleButton = screen.getByText(/continue with google/i).closest('button');
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockSignInWithGoogle).toHaveBeenCalled();
      });
    });

    it('should navigate to dashboard on successful Google sign in', async () => {
      mockSignInWithGoogle.mockResolvedValueOnce({});
      renderLogin();

      const googleButton = screen.getByText(/continue with google/i).closest('button');
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should display error on failed Google sign in', async () => {
      mockSignInWithGoogle.mockRejectedValueOnce(new Error('Google error'));
      renderLogin();

      const googleButton = screen.getByText(/continue with google/i).closest('button');
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to sign in with google/i)).toBeInTheDocument();
      });
    });
  });
});
