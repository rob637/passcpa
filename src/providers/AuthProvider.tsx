import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import logger from '../utils/logger';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';
import { initializeNotifications } from '../services/pushNotifications';
import type { FieldValue, Timestamp } from 'firebase/firestore';

// Firebase error type for proper catch handling
interface FirebaseError extends Error {
  code?: string;
}

export interface UserProfile {
  id: string;
  uid?: string; // Alias for id, some code uses this
  email: string;
  displayName: string;
  photoURL?: string | null; // User profile photo
  createdAt: Timestamp | FieldValue; // Firestore Timestamp
  onboardingComplete: boolean;
  onboardingCompletedAt?: Timestamp | Date | null;
  examSection: string | null;
  examDate: Timestamp | Date | null;
  dailyGoal: number;
  studyPlanId: string | null;
  isAdmin?: boolean; // Admin role for CMS access
  dailyReminderEnabled?: boolean;
  dailyReminderTime?: string;
  weeklyReportEnabled?: boolean;
  settings: {
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  };
}

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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

    return () => unsubscribe();
  }, []);

  // Sign in with email/password
  const signIn = async (email: string, password: string): Promise<User> => {
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
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

      // Create user document in Firestore
      const newUserProfile: Omit<UserProfile, 'id'> = {
        email,
        displayName,
        createdAt: serverTimestamp(),
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
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
      throw err;
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

  // Google sign-in
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
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
          createdAt: serverTimestamp(),
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
        await setDoc(userRef, newProfile);
        setUserProfile({ 
          ...newProfile,
          id: user.uid, 
        } as UserProfile);
      } else {
        await fetchUserProfile(user.uid);
      }
      
      return user;
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
    updateUserProfile,
    refreshProfile: async () => {
        if (user) await fetchUserProfile(user.uid);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
