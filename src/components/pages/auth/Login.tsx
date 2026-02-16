import { useState, useEffect } from 'react';
import logger from '../../../utils/logger';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { saveCoursePreference } from '../../../utils/courseDetection';
import type { CourseId } from '../../../types/course';

// Valid course IDs
const VALID_COURSES: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];

// Course-to-dashboard mapping
const COURSE_DASHBOARDS: Record<string, string> = {
  cpa: '/home',
  ea: '/ea',
  cma: '/cma/dashboard',
  cia: '/cia/dashboard',
  cfp: '/cfp/dashboard',
  cisa: '/cisa/dashboard',
};

// Course display names
const COURSE_NAMES: Record<string, string> = {
  cpa: 'CPA',
  ea: 'EA',
  cma: 'CMA',
  cia: 'CIA',
  cfp: 'CFP',
  cisa: 'CISA',
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signInWithGoogle, updateUserProfile, loading } = useAuth();

  // Get course from URL params (e.g., /login?course=ea)
  const courseParam = searchParams.get('course')?.toLowerCase();
  const isValidCourse = courseParam && VALID_COURSES.includes(courseParam as CourseId);
  const targetDashboard = COURSE_DASHBOARDS[courseParam || ''] || '/dashboard';

  // Save course preference so detectCourse() picks it up after login
  // (prevents defaulting to CPA when landing on /home)
  useEffect(() => {
    if (isValidCourse) {
      saveCoursePreference(courseParam as CourseId);
      localStorage.setItem('pendingCourse', courseParam as string);
    }
  }, [courseParam, isValidCourse]);
  const courseName = COURSE_NAMES[courseParam || ''] || 'exam prep';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      // Switch to the requested course if specified
      if (isValidCourse) {
        await updateUserProfile({ activeCourse: courseParam as CourseId });
      }
      navigate(targetDashboard);
    } catch (err: any) {
      logger.error('Login error:', err);
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      // Switch to the requested course if specified
      if (isValidCourse) {
        await updateUserProfile({ activeCourse: courseParam as CourseId });
      }
      // The AuthProvider handles creating profile, we just navigate
      navigate(targetDashboard);
    } catch (err: any) {
      logger.error('Google sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        // User closed the popup, don't show error
        return;
      } else if (err.code === 'auth/cancelled-popup-request') {
        return;
      }
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <Card variant="elevated" className="border border-slate-200 dark:border-slate-700 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Sign in to continue your {courseName} journey</p>
      </div>

      {/* Google Sign In - Primary Option */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all font-medium text-slate-700 dark:text-slate-200 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-600" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300">or sign in with email</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-400"
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-400"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
          disabled={loading}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-8 text-center text-slate-600 dark:text-slate-300">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
          Sign up free
        </Link>
      </p>
    </Card>
  );
};

export default Login;
