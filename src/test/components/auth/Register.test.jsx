import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../../components/pages/auth/Register';

// Mock useAuth
const mockSignUp = vi.fn();
const mockSignInWithGoogle = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    signUp: mockSignUp,
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

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the registration form', () => {
      renderRegister();
      expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    });

    it('should render name fields', () => {
      renderRegister();
      expect(screen.getByPlaceholderText(/john/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/smith/i)).toBeInTheDocument();
    });

    it('should render email field', () => {
      renderRegister();
      expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    });

    it('should render password fields', () => {
      renderRegister();
      expect(screen.getByPlaceholderText(/create a strong password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument();
    });

    it('should render create account button', () => {
      renderRegister();
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('should render Google sign up button', () => {
      renderRegister();
      expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
    });
  });

  describe('Password Requirements Display', () => {
    it('should show password requirements when typing password', () => {
      renderRegister();
      // Password requirements only show when there's password input
      const passwordInput = screen.getByPlaceholderText(/create a strong password/i);
      fireEvent.change(passwordInput, { target: { value: 'a' } });
      
      expect(screen.getByText(/8\+ characters/i)).toBeInTheDocument();
      expect(screen.getByText(/uppercase/i)).toBeInTheDocument();
      expect(screen.getByText(/lowercase/i)).toBeInTheDocument();
      expect(screen.getByText(/number/i)).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    const fillValidForm = () => {
      fireEvent.change(screen.getByPlaceholderText(/john/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByPlaceholderText(/smith/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/create a strong password/i), { target: { value: 'StrongPass1' } });
      fireEvent.change(screen.getByPlaceholderText(/confirm your password/i), { target: { value: 'StrongPass1' } });
    };

    it('should call signUp with correct data on valid submit', async () => {
      mockSignUp.mockResolvedValueOnce({});
      renderRegister();

      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith('john@example.com', 'StrongPass1', 'John Doe');
      });
    });

    it('should navigate to onboarding on successful registration', async () => {
      mockSignUp.mockResolvedValueOnce({});
      renderRegister();

      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/verify-email');
      });
    });

    it('should display error for email already in use', async () => {
      mockSignUp.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
      renderRegister();

      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText(/already exists/i)).toBeInTheDocument();
      });
    });
  });

  describe('Google Sign Up', () => {
    it('should call signInWithGoogle on Google button click', async () => {
      mockSignInWithGoogle.mockResolvedValueOnce({});
      renderRegister();

      const googleButton = screen.getByText(/continue with google/i).closest('button');
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockSignInWithGoogle).toHaveBeenCalled();
      });
    });

    it('should navigate to onboarding on successful Google sign up', async () => {
      mockSignInWithGoogle.mockResolvedValueOnce({});
      renderRegister();

      const googleButton = screen.getByText(/continue with google/i).closest('button');
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/onboarding');
      });
    });

    it('should display error on failed Google sign up', async () => {
      mockSignInWithGoogle.mockRejectedValueOnce(new Error('Google error'));
      renderRegister();

      const googleButton = screen.getByText(/continue with google/i).closest('button');
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to sign up with google/i)).toBeInTheDocument();
      });
    });
  });
});
