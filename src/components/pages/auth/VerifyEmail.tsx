import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { trackEvent } from '../../../services/analytics';
import logger from '../../../utils/logger';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, resendVerificationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Track when user lands on verification page
  useEffect(() => {
    trackEvent('email_verification_pending', {});
  }, []);

  // Poll for email verification status
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // If already verified, redirect to onboarding
    if (user.emailVerified) {
      trackEvent('email_verified', {});
      navigate('/onboarding');
      return;
    }

    // Poll every 3 seconds to check if email is verified
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        trackEvent('email_verified', {});
        navigate('/onboarding');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    setError('');
    setResendSuccess(false);

    try {
      await resendVerificationEmail();
      setResendSuccess(true);
      setCountdown(60); // 60 second cooldown
    } catch (err: any) {
      logger.error('Error resending verification email:', err);
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few minutes before trying again.');
      } else {
        setError('Failed to resend verification email. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Verify your email</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          We sent a verification link to:
        </p>
        <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">
          {user.email}
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
        <h3 className="font-medium text-slate-900 dark:text-white mb-2">Next steps:</h3>
        <ol className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
            <span>Check your email inbox (and spam folder)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
            <span>Click the verification link in the email</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
            <span>You'll be automatically redirected once verified</span>
          </li>
        </ol>
      </div>

      {/* Status Messages */}
      {resendSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg mb-4">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">Verification email sent! Check your inbox.</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Resend Button */}
      <button
        onClick={handleResend}
        disabled={isResending || countdown > 0}
        className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isResending ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : countdown > 0 ? (
          <>
            <RefreshCw className="w-5 h-5" />
            Resend in {countdown}s
          </>
        ) : (
          <>
            <RefreshCw className="w-5 h-5" />
            Resend verification email
          </>
        )}
      </button>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Wrong email?{' '}
          <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Sign up again
          </Link>
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Already verified?{' '}
          <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
