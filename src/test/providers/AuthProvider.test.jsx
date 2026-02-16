import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Unmock AuthProvider since we're testing the actual implementation
vi.unmock('../../providers/AuthProvider');
vi.unmock('../../hooks/useAuth');

// Simplified mocks to prevent memory issues
vi.mock('../../config/firebase', () => ({
  auth: { currentUser: null },
  db: {},
}));

const mockSignInWithEmailAndPassword = vi.fn();
const mockCreateUserWithEmailAndPassword = vi.fn();
const mockSignOut = vi.fn();
const mockSendPasswordResetEmail = vi.fn();
const mockUpdateProfile = vi.fn();
const mockOnAuthStateChanged = vi.fn(() => () => {});

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (...args) => mockOnAuthStateChanged(...args),
  signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
  createUserWithEmailAndPassword: (...args) => mockCreateUserWithEmailAndPassword(...args),
  signOut: (...args) => mockSignOut(...args),
  sendPasswordResetEmail: (...args) => mockSendPasswordResetEmail(...args),
  sendEmailVerification: vi.fn().mockResolvedValue(undefined),
  GoogleAuthProvider: vi.fn(() => ({
    setCustomParameters: vi.fn(),
  })),
  signInWithPopup: vi.fn().mockRejectedValue(new Error('Popup blocked or cancelled')),
  signInWithRedirect: vi.fn().mockResolvedValue(undefined),
  getRedirectResult: vi.fn().mockResolvedValue(null),
  updateProfile: (...args) => mockUpdateProfile(...args),
}));

const mockGetDoc = vi.fn().mockResolvedValue({ exists: () => false });
const mockSetDoc = vi.fn().mockResolvedValue({});
const mockUpdateDoc = vi.fn().mockResolvedValue({});

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  getDoc: (...args) => mockGetDoc(...args),
  setDoc: (...args) => mockSetDoc(...args),
  updateDoc: (...args) => mockUpdateDoc(...args),
  onSnapshot: vi.fn(() => () => {}),
  serverTimestamp: vi.fn(() => new Date()),
}));

import { AuthProvider, useAuth } from '../../providers/AuthProvider';

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Provider Rendering', () => {
    it('should render children', () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <div>Test Child</div>
          </AuthProvider>
        </BrowserRouter>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('useAuth Hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        const TestComponent = () => {
          useAuth();
          return null;
        };
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');
      
      consoleSpy.mockRestore();
    });

    it('provides context values within provider', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(contextValues).toBeDefined();
      expect(typeof contextValues.signIn).toBe('function');
      expect(typeof contextValues.signUp).toBe('function');
      expect(typeof contextValues.signOut).toBe('function');
      expect(typeof contextValues.resetPassword).toBe('function');
    });

    it('provides loading state', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(contextValues.loading).toBeDefined();
    });

    it('provides error state', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(contextValues.error).toBeDefined();
    });
  });

  describe('Auth Functions', () => {
    it('signIn function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.signIn).toBe('function');
    });

    it('signUp function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.signUp).toBe('function');
    });

    it('signOut function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.signOut).toBe('function');
    });

    it('resetPassword function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.resetPassword).toBe('function');
    });

    it('updateUserProfile function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.updateUserProfile).toBe('function');
    });

    it('signInWithGoogle function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.signInWithGoogle).toBe('function');
    });

    it('refreshProfile function is callable', () => {
      let contextValues;
      
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      expect(typeof contextValues.refreshProfile).toBe('function');
    });
  });

  describe('Auth Function Execution', () => {
    it('signIn calls Firebase signInWithEmailAndPassword', async () => {
      mockSignInWithEmailAndPassword.mockResolvedValue({ user: { uid: 'test-uid' } });
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await act(async () => {
        await contextValues.signIn('test@example.com', 'password123');
      });

      expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
    });

    it('signIn handles errors', async () => {
      mockSignInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'));
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await expect(async () => {
        await act(async () => {
          await contextValues.signIn('test@example.com', 'wrong-password');
        });
      }).rejects.toThrow('Invalid credentials');
    });

    it('signUp calls Firebase createUserWithEmailAndPassword', async () => {
      mockCreateUserWithEmailAndPassword.mockResolvedValue({ 
        user: { 
          uid: 'new-uid',
          getIdToken: vi.fn().mockResolvedValue('mock-id-token'),
        } 
      });
      mockUpdateProfile.mockResolvedValue({});
      mockSetDoc.mockResolvedValue({});
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await act(async () => {
        await contextValues.signUp('new@example.com', 'password123', 'New User');
      });

      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled();
      expect(mockUpdateProfile).toHaveBeenCalled();
      expect(mockSetDoc).toHaveBeenCalled();
    });

    it('signUp handles errors', async () => {
      mockCreateUserWithEmailAndPassword.mockRejectedValue(new Error('Email already exists'));
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await expect(async () => {
        await act(async () => {
          await contextValues.signUp('existing@example.com', 'password123', 'User');
        });
      }).rejects.toThrow('Email already exists');
    });

    it('signOut calls Firebase signOut', async () => {
      mockSignOut.mockResolvedValue({});
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await act(async () => {
        await contextValues.signOut();
      });

      expect(mockSignOut).toHaveBeenCalled();
    });

    it('signOut handles errors', async () => {
      mockSignOut.mockRejectedValue(new Error('Sign out failed'));
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await expect(async () => {
        await act(async () => {
          await contextValues.signOut();
        });
      }).rejects.toThrow('Sign out failed');
    });

    it('resetPassword calls Firebase sendPasswordResetEmail', async () => {
      mockSendPasswordResetEmail.mockResolvedValue({});
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await act(async () => {
        await contextValues.resetPassword('user@example.com');
      });

      expect(mockSendPasswordResetEmail).toHaveBeenCalled();
    });

    it('resetPassword handles errors', async () => {
      mockSendPasswordResetEmail.mockRejectedValue(new Error('User not found'));
      
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await expect(async () => {
        await act(async () => {
          await contextValues.resetPassword('unknown@example.com');
        });
      }).rejects.toThrow('User not found');
    });

    it('updateUserProfile throws error when no user', async () => {
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await expect(async () => {
        await act(async () => {
          await contextValues.updateUserProfile({ displayName: 'New Name' });
        });
      }).rejects.toThrow('No user logged in');
    });

    it('signInWithGoogle throws error on popup failure', async () => {
      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await expect(async () => {
        await act(async () => {
          await contextValues.signInWithGoogle();
        });
      }).rejects.toThrow('Popup blocked or cancelled');
    });
  });

  describe('User Profile Fetching', () => {
    it('fetches profile when user exists', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({ displayName: 'Test User', email: 'test@example.com' }),
      });

      // Simulate auth state change with user
      let authCallback;
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return () => {};
      });

      render(
        <BrowserRouter>
          <AuthProvider>
            <div>Test</div>
          </AuthProvider>
        </BrowserRouter>
      );

      // Trigger auth state change
      await act(async () => {
        if (authCallback) {
          await authCallback({ uid: 'test-uid', email: 'test@example.com' });
        }
      });

      expect(mockGetDoc).toHaveBeenCalled();
    });

    it('sets profile to null when user doc does not exist', async () => {
      mockGetDoc.mockResolvedValue({
        exists: () => false,
      });

      let authCallback;
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return () => {};
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      await act(async () => {
        if (authCallback) {
          await authCallback({ uid: 'test-uid' });
        }
      });

      expect(contextValues.userProfile).toBeNull();
    });

    it('handles error when fetching profile', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockGetDoc.mockRejectedValue(new Error('Firestore error'));

      let authCallback;
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return () => {};
      });

      render(
        <BrowserRouter>
          <AuthProvider>
            <div>Test</div>
          </AuthProvider>
        </BrowserRouter>
      );

      await act(async () => {
        if (authCallback) {
          await authCallback({ uid: 'test-uid' });
        }
      });

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error'), expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('clears user and profile on sign out', async () => {
      let authCallback;
      mockOnAuthStateChanged.mockImplementation((auth, callback) => {
        authCallback = callback;
        return () => {};
      });

      let contextValues;
      const TestConsumer = () => {
        contextValues = useAuth();
        return <div>Consumer</div>;
      };

      render(
        <BrowserRouter>
          <AuthProvider>
            <TestConsumer />
          </AuthProvider>
        </BrowserRouter>
      );

      // First sign in
      mockGetDoc.mockResolvedValue({ exists: () => true, data: () => ({ displayName: 'User' }) });
      await act(async () => {
        if (authCallback) await authCallback({ uid: 'test-uid' });
      });

      // Then sign out
      await act(async () => {
        if (authCallback) await authCallback(null);
      });

      expect(contextValues.user).toBeNull();
      expect(contextValues.userProfile).toBeNull();
    });
  });
});
