/**
 * ExitIntentModal
 * 
 * A modal that appears when a user is about to leave the page.
 * Offers a last-chance incentive to capture their email or redirect to registration.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight, Sparkles, Mail } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import { trackEvent } from '../../services/analytics';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseName: string;
}

const ExitIntentModal = ({ isOpen, onClose, courseId, courseName }: ExitIntentModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Save to waitlist collection with exit intent flag
      const emailKey = email.toLowerCase().replace(/[.#$[\]]/g, '_');
      await setDoc(doc(db, 'waitlist', emailKey), {
        email: email.toLowerCase(),
        courseId,
        source: 'exit_intent_modal',
        createdAt: serverTimestamp(),
        tags: ['exit_intent', courseName.toLowerCase()],
      }, { merge: true });

      trackEvent('exit_intent_email_captured', {
        course: courseId,
        source: 'exit_intent_modal',
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to save email:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartTrial = () => {
    trackEvent('exit_intent_start_trial', {
      course: courseId,
      source: 'exit_intent_modal',
    });
    window.location.href = `/register?course=${courseId}&ref=exit_intent`;
  };

  const handleDismiss = () => {
    trackEvent('exit_intent_dismissed', {
      course: courseId,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header with gift icon */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  Wait! Don't miss out
                </h2>
                <p className="text-blue-100">
                  Get your free {courseName} study guide before you go
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {!submitted ? (
                  <>
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-sm">Free {courseName} exam overview PDF</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-sm">Weekly study tips from passing candidates</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-sm">Early access to new features</span>
                      </div>
                    </div>

                    {/* Email form */}
                    <form onSubmit={handleSubmit} className="mb-4">
                      <div className="relative mb-3">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          disabled={isSubmitting}
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm mb-3">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Me the Guide'}
                      </button>
                    </form>

                    {/* Or start trial */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">or</span>
                      </div>
                    </div>

                    <button
                      onClick={handleStartTrial}
                      className="w-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 py-3 rounded-xl font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      Start 14-Day Free Trial
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  /* Success state */
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Check your inbox!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      We've sent your free {courseName} study guide to <strong>{email}</strong>
                    </p>
                    <button
                      onClick={handleStartTrial}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Start Your Free Trial Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Footer note */}
              <div className="px-6 pb-4 text-center">
                <p className="text-xs text-slate-400">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;
