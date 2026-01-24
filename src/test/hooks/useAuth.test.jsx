import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../providers/AuthProvider';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Test wrapper
const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock onAuthStateChanged to call callback with null (logged out)
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return vi.fn(); // unsubscribe function
    });
  });

  describe('Initial State', () => {
    it('should start with loading state', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    it('should have null user when not authenticated', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toBe(null);
        expect(result.current.userProfile).toBe(null);
      });
    });
  });

  describe('signIn', () => {
    it('should call signInWithEmailAndPassword', async () => {
      const mockUser = { uid: 'test-uid', email: 'test@example.com' };
      signInWithEmailAndPassword.mockResolvedValueOnce({ user: mockUser });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.signIn('test@example.com', 'password123');
      });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
    });

    it('should handle sign in errors', async () => {
      const error = new Error('Invalid credentials');
      signInWithEmailAndPassword.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await expect(
        act(async () => {
          await result.current.signIn('test@example.com', 'wrong-password');
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('signUp', () => {
    it('should create user and Firestore document', async () => {
      const mockUser = { uid: 'new-user-uid', email: 'new@example.com' };
      createUserWithEmailAndPassword.mockResolvedValueOnce({ user: mockUser });
      updateProfile.mockResolvedValueOnce();
      setDoc.mockResolvedValueOnce();

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.signUp('new@example.com', 'password123', 'John Doe');
      });

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'new@example.com',
        'password123'
      );

      expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'John Doe' });

      expect(setDoc).toHaveBeenCalled();
    });

    it('should handle sign up errors', async () => {
      const error = new Error('Email already in use');
      createUserWithEmailAndPassword.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await expect(
        act(async () => {
          await result.current.signUp('existing@example.com', 'password123', 'Jane');
        })
      ).rejects.toThrow('Email already in use');
    });
  });

  describe('signOut', () => {
    it('should call Firebase signOut', async () => {
      signOut.mockResolvedValueOnce();

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      sendPasswordResetEmail.mockResolvedValueOnce();

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.resetPassword('test@example.com');
      });

      expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'test@example.com');
    });
  });

  describe('useAuth outside provider', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });
  });
});
