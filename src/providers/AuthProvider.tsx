import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import logger from '../utils/logger';
import { analytics } from '../services/analytics';
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
  signInWithCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { auth, db, functions } from '../config/firebase.js';
import { initializeNotifications } from '../services/pushNotifications';
import { getPendingReferral, applyReferralCode } from '../services/referral';
import { saveCoursePreference } from '../utils/courseDetection';
import { isAdminEmail } from '../config/adminConfig';
import { Capacitor } from '@capacitor/core';
import { UserProfile, CourseId } from '../types';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

// Re-export UserProfile for components that import from AuthProvider
export type { UserProfile };

// Check if running in native Capacitor app
const isNativePlatform = Capacitor.isNativePlatform();

// Firebase error type for proper catch handling
interface FirebaseError extends Error {
  code?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  profileLoaded: boolean;
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
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string, email?: string | null) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const profile = { id: uid, ...userDoc.data() } as UserProfile;
        
        // Auto-sync isAdmin flag: if the user's email is in the admin whitelist
        // but their Firestore doc doesn't have isAdmin: true, set it now.
        // This ensures Firestore security rules (which check isAdmin on the doc)
        // stay in sync with the client-side ADMIN_EMAILS list.
        if (isAdminEmail(email) && !profile.isAdmin) {
          try {
            await updateDoc(doc(db, 'users', uid), { isAdmin: true });
            profile.isAdmin = true;
            logger.info(`[Auth] Auto-synced isAdmin flag for ${email}`);
          } catch (syncErr) {
            logger.warn('[Auth] Could not auto-sync isAdmin flag:', syncErr);
          }
        }
        
        setUserProfile(profile);
        
        // Sync Firestore activeCourse to localStorage so CourseProvider detects it correctly.
        // This is critical for cross-device login — without it, user lands on CPA instead of their course.
        if (profile.activeCourse) {
          saveCoursePreference(profile.activeCourse);
        }
      } else {
        setUserProfile(null);
      }
    } catch (err) {
      logger.error('Error fetching user profile:', err);
      setUserProfile(null);
    } finally {
      setProfileLoaded(true);
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
          // Get pending course from registration flow (saved in localStorage by Register.tsx or Login.tsx)
          const pendingCourse = localStorage.getItem('pendingCourse') || 'cpa';

          const newProfile: Omit<UserProfile, 'id'> = {
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
            onboardingComplete: false,
            activeCourse: pendingCourse as CourseId,
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
        // If user appears unverified, reload from server to get latest status.
        // Firebase caches auth state locally — if the user verified their email
        // in another tab/session and then closed the app, the cached state is stale.
        if (!firebaseUser.emailVerified) {
          try {
            await firebaseUser.reload();
          } catch (err) {
            logger.warn('Failed to reload user during auth state change:', err);
          }
        }
        setUser(firebaseUser);
        // Fetch user profile from Firestore
        await fetchUserProfile(firebaseUser.uid, firebaseUser.email);
        
        // Initialize notifications for this user
        initializeNotifications(firebaseUser.uid).catch((err) => {
          logger.log('Notification initialization skipped:', err.message);
        });
      } else {
        setUser(null);
        setUserProfile(null);
        setProfileLoaded(false);
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
      // Sign out any existing user first to prevent session conflicts
      // (e.g., stale unverified user blocking new registration)
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(result.user, { displayName });

      // Wait for ID token to be ready before calling Cloud Function
      // This ensures Firebase Auth is fully initialized after account creation
      await result.user.getIdToken(true);

      // Send branded verification email via Cloud Function (Resend)
      try {
        const sendCustomEmailVerification = httpsCallable(functions, 'sendCustomEmailVerification');
        await sendCustomEmailVerification({ email });
      } catch (verifyErr: any) {
        // Fallback to Firebase's built-in email if Cloud Function fails
        logger.warn('Cloud Function verification email failed, using Firebase default:', verifyErr);
        try {
          await sendEmailVerification(result.user, {
            url: `${window.location.origin}/login`,
          });
        } catch (fallbackErr) {
          logger.warn('Firebase verification fallback also failed:', fallbackErr);
        }
      }

      // Get pending course from registration flow (saved in localStorage by Register.tsx)
      const pendingCourse = localStorage.getItem('pendingCourse') || 'cpa';

      // Save to 'voraprep_active_course' so detectCourse() finds it.
      // Without this, the user lands on CPA instead of their chosen course.
      saveCoursePreference(pendingCourse as CourseId);

      // Create user document in Firestore
      const newUserProfile: Omit<UserProfile, 'id'> = {
        email,
        displayName,
        createdAt: serverTimestamp(),
        onboardingComplete: false,
        // Store the course they signed up for so it persists across windows/devices
        activeCourse: pendingCourse as CourseId,
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

      // Re-fetch the profile so it's immediately available in React state.
      // Without this, onAuthStateChanged already fired (before setDoc) and found no doc,
      // leaving userProfile=null until the next page load.
      await fetchUserProfile(result.user.uid);

      // Apply any pending referral code
      const pendingReferral = getPendingReferral();
      if (pendingReferral) {
        await applyReferralCode(result.user.uid, pendingReferral);
        logger.info('Applied referral code:', pendingReferral);
      }

      // Track signup conversion for Google Ads SEM optimization
      analytics.trackSignupConversion(result.user.uid, 'email');
      // Track trial start (14-day trial begins at signup)
      analytics.trackTrialStartConversion(result.user.uid, pendingCourse);

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
    
    // Send branded verification email via Cloud Function (Resend)
    try {
      const sendCustomEmailVerification = httpsCallable(functions, 'sendCustomEmailVerification');
      await sendCustomEmailVerification({ email: user.email });
    } catch (err: any) {
      // Fallback to Firebase's built-in email if Cloud Function fails
      logger.warn('Cloud Function verification email failed, using Firebase default:', err);
      try {
        await sendEmailVerification(user, {
          url: `${window.location.origin}/login`,
        });
      } catch (fallbackErr) {
        const error = fallbackErr as FirebaseError;
        setError(error.message);
        throw fallbackErr;
      }
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

  // Google sign-in - uses native on Capacitor, popup/redirect on web
  const signInWithGoogle = async () => {
    try {
      let user: User;

      if (isNativePlatform) {
        // Native: Use Capacitor Firebase Authentication plugin
        // This uses Android/iOS native Google Sign-In which works properly
        logger.log('Using native Google Sign-In');
        const result = await FirebaseAuthentication.signInWithGoogle();
        
        // Extract idToken from native sign-in result
        const idToken = result.credential?.idToken;
        if (!idToken) {
          throw new Error('No ID token returned from native Google Sign-In');
        }
        
        // Sign in to Firebase with the Google credential
        const credential = GoogleAuthProvider.credential(idToken);
        const firebaseResult = await signInWithCredential(auth, credential);
        user = firebaseResult.user;
      } else {
        // Web: Use popup first, fallback to redirect
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        try {
          const result = await signInWithPopup(auth, provider);
          user = result.user;
        } catch (popupErr) {
          const error = popupErr as FirebaseError;
          // If popup was blocked or closed, try redirect as fallback
          if (error.code === 'auth/popup-blocked' || 
              error.code === 'auth/popup-closed-by-user' ||
              error.code === 'auth/cancelled-popup-request') {
            logger.log('Popup blocked/closed, falling back to redirect');
            await signInWithRedirect(auth, provider);
            return null as unknown as User;
          }
          throw popupErr;
        }
      }
      
      // Check if user profile exists, create if not
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create new profile for Google user
        const newProfile: Omit<UserProfile, 'id'> = {
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL,
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
        await setDoc(userRef, { ...newProfile, lastLogin: serverTimestamp() });
        setUserProfile({ 
          ...newProfile,
          id: user.uid, 
        } as UserProfile);

        // Track Google signup conversion for Google Ads SEM optimization
        analytics.trackSignupConversion(user.uid, 'google');
        analytics.trackTrialStartConversion(user.uid, 'pending');
      } else {
        // Update last login for existing user
        await updateDoc(userRef, { lastLogin: serverTimestamp() });
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
    profileLoaded,
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
