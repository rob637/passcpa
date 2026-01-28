import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';
import { initializeNotifications } from '../services/pushNotifications';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: any; // specific firebase type or generic
  onboardingComplete: boolean;
  examSection: string | null;
  examDate: any | null;
  dailyGoal: number;
  studyPlanId: string | null;
  settings: {
    notifications: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  };
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
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
      console.error('Error fetching user profile:', err);
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
          console.log('Notification initialization skipped:', err.message);
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
    } catch (err: any) {
      setError(err.message);
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
    } catch (err: any) {
      setError(err.message);
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
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
      setUserProfile((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Google sign-in (placeholder - needs to be enabled in Firebase Console)
  const signInWithGoogle = async () => {
    throw new Error('Google sign-in is not yet configured. Please use email/password.');
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
