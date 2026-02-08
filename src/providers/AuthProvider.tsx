import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import logger from '../utils/logger';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '../config/firebase.js';
import { initializeNotifications } from '../services/pushNotifications';
import { Capacitor } from '@capacitor/core';
import { UserProfile } from '../types';

// Check if running in native Capacitor app
const isNativePlatform = Capacitor.isNativePlatform();

// Firebase error type for proper catch handling
interface FirebaseError extends Error {
  code?: string;
}

// Re-export UserProfile for backwards compatibility
export type { UserProfile } from '../types';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile({ id: uid, ...userDoc.data() } as UserProfile);
      } else {
        setUserProfile(null);
      }
    } catch (err) {
      logger.error('Error fetching user profile:', err);
      setUserProfile(null);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    let authResolved = false;
    
    // Safety timeout to prevent infinite loading if Firebase doesn't respond
    const timeout = setTimeout(() => {
      if (!authResolved) {
        logger.warn('Auth timeout - Firebase may be unreachable');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    // Handle redirect result (for Google sign-in on mobile)
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        // User signed in via redirect, handle profile creation
        const user = result.user;
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          const newProfile: Omit<UserProfile, 'id'> = {
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL,
            createdAt: serverTimestamp() as unknown as Date,
            onboardingComplete: false,
            examSection: null,
            examDate: null,
            dailyGoal: 25,
            studyPlanId: null,
            settings: {
              notifications: true,
              darkMode: false,
              soundEffects: true,
            },
          };
          await setDoc(userRef, { ...newProfile, lastLogin: serverTimestamp() });
        } else {
          await updateDoc(userRef, { lastLogin: serverTimestamp() });
        }
      }
    }).catch((err) => {
      logger.error('Redirect result error:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      authResolved = true;
      clearTimeout(timeout);
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch user profile from Firestore
        await fetchUserProfile(firebaseUser.uid);
        
        // Initialize notifications for this user
        initializeNotifications(firebaseUser.uid).catch((err) => {
          logger.log('Notification initialization skipped:', err.message);
        });
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  // Sign in with email/password
  const signIn = async (email: string, password: string): Promise<User> => {
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Update last login timestamp
      await updateDoc(doc(db, 'users', result.user.uid), {
        lastLogin: serverTimestamp(),
      }).catch(() => {}); // Silent fail if user doc doesn't exist yet
      return result.user;
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(result.user, { displayName });

      // Send email verification
      await sendEmailVerification(result.user, {
        url: `${window.location.origin}/login`,
      });

      // Create user document in Firestore
      const newUserProfile: Omit<UserProfile, 'id'> = {
        email,
        displayName,
        createdAt: serverTimestamp() as unknown as Date,
        onboardingComplete: false,
        examSection: null,
        examDate: null,
        dailyGoal: 50,
        studyPlanId: null,
        settings: {
          notifications: true,
          darkMode: false,
          soundEffects: true,
        },
      };

      await setDoc(doc(db, 'users', result.user.uid), newUserProfile);

      return result.user;
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
    }
  };

  // Sign out
  const signOut = async () => {
    setError(null);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      
      // Clear user-specific cached data to prevent data leakage between accounts
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('daily_plan_') || 
        key.startsWith('dailyplan_completed_')
      );
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
    }
  };

  // Resend email verification
  const resendVerificationEmail = async () => {
    if (!user) throw new Error('No user logged in');
    if (user.emailVerified) throw new Error('Email already verified');
    
    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}/login`,
      });
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
    }
  };

  // Reset password with custom branded email via Cloud Function
  const resetPassword = async (email: string) => {
    setError(null);
    try {
      // Try custom branded email first (via Cloud Function)
      // Use the functions instance from firebase.js that's configured for the correct project
      const sendCustomPasswordReset = httpsCallable(functions, 'sendCustomPasswordReset');
      await sendCustomPasswordReset({ email });
    } catch (err) {
      // Fallback to Firebase's default email if Cloud Function fails
      logger.warn('Custom reset email failed, using Firebase default:', err);
      try {
        const actionCodeSettings = {
          url: `${window.location.origin}/login`,
          handleCodeInApp: false,
        };
        await sendPasswordResetEmail(auth, email, actionCodeSettings);
      } catch (fallbackErr) {
        const error = fallbackErr as FirebaseError;
        setError(error.message);
        throw fallbackErr;
      }
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
      setUserProfile((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
    }
  };

  // Google sign-in - try popup first, fallback to redirect if blocked
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      // Try popup first (works on most browsers including mobile Safari)
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Check if user profile exists, create if not
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          // Create new profile for Google user
          const newProfile: Omit<UserProfile, 'id'> = {
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL,
            createdAt: serverTimestamp() as unknown as Date,
            onboardingComplete: false,
            examSection: null,
            examDate: null,
            dailyGoal: 25,
            studyPlanId: null,
            settings: {
              notifications: true,
              darkMode: false,
              soundEffects: true,
            },
          };
          await setDoc(userRef, { ...newProfile, lastLogin: serverTimestamp() });
          setUserProfile({ 
            ...newProfile,
            id: user.uid, 
          } as UserProfile);
        } else {
          // Update last login for existing user
          await updateDoc(userRef, { lastLogin: serverTimestamp() });
          await fetchUserProfile(user.uid);
        }
        
        return user;
      } catch (popupErr) {
        const error = popupErr as FirebaseError;
        // If popup was blocked or closed, try redirect as fallback (web only)
        // Redirect doesn't work on native Capacitor apps due to WebView storage partitioning
        if (!isNativePlatform && (
            error.code === 'auth/popup-blocked' || 
            error.code === 'auth/popup-closed-by-user' ||
            error.code === 'auth/cancelled-popup-request')) {
          logger.log('Popup blocked/closed, falling back to redirect');
          await signInWithRedirect(auth, provider);
          return null as unknown as User;
        }
        // On native apps, just re-throw the error - user can try again
        throw popupErr;
      }
    } catch (err) {
      // Error logged by error boundary
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    resendVerificationEmail,
    updateUserProfile,
    refreshProfile: async () => {
        if (user) await fetchUserProfile(user.uid);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
