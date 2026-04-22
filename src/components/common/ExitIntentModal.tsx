/**
 * ExitIntentModal
 *
 * Last-chance offer when a non-authed visitor is about to leave a landing page.
 *
 * Tactics:
 *  - Single, real, deliverable offer: 30% off founder pricing for 3 months (FOUNDER220)
 *  - One primary CTA → /start-checkout with coupon pre-applied (lands on register if signed out)
 *  - Soft secondary path: 14-day free trial (no credit card)
 *  - Honest framing — no fake "free PDF" lead magnet we can't deliver
 */

import { useState } from 'react';
import logger from '../../utils/logger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { trackEvent } from '../../services/analytics';

const COUPON_CODE = 'FOUNDER220';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseName: string;
}

const ExitIntentModal = ({ isOpen, onClose, courseId, courseName }: ExitIntentModalProps) => {
  const [redirecting, setRedirecting] = useState(false);

  const handleClaimOffer = () => {
    setRedirecting(true);
    try {
      trackEvent('exit_intent_claim_founder_offer', { course: courseId, coupon: COUPON_CODE });
    } catch (err) {
      logger.warn('exit_intent analytics failed', err);
    }
    window.location.href = `/start-checkout?course=${courseId}&interval=annual&coupon=${COUPON_CODE}&utm_source=exit_intent&utm_medium=modal&utm_campaign=founder220`;
  };

  const handleStartTrial = () => {
    try {
      trackEvent('exit_intent_start_trial', { course: courseId, source: 'exit_intent_modal' });
    } catch (err) {
      logger.warn('exit_intent analytics failed', err);
    }
    window.location.href = `/register?course=${courseId}&ref=exit_intent`;
  };

  const handleDismiss = () => {
    try {
      trackEvent('exit_intent_dismissed', { course: courseId });
    } catch (err) {
      logger.warn('exit_intent analytics failed', err);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold mb-2">Before you go &mdash; founder offer</h2>
                <p className="text-blue-100">30% off founder pricing for your first 3 months</p>
              </div>

              <div className="p-6">
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">Already-low founder pricing &mdash; an extra 30% off</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">Full {courseName} access &mdash; questions, lessons, simulations</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">Pass guarantee &mdash; we extend if you don't pass</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-700/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Coupon</p>
                    <p className="font-mono font-bold text-slate-900 dark:text-white">{COUPON_CODE}</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 text-right">
                    Auto-applied at checkout
                  </span>
                </div>

                <button
                  onClick={handleClaimOffer}
                  disabled={redirecting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {redirecting ? 'Loading checkout...' : (<>Claim founder pricing<ArrowRight className="w-4 h-4" /></>)}
                </button>

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
                  Start 14-day free trial first
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 pb-4 text-center">
                <p className="text-xs text-slate-400">
                  Coupon valid for 3 monthly billing cycles. Cancel anytime from your account.
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
