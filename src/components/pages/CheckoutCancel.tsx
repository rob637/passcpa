/**
 * Checkout Cancel Page
 * Shown when user cancels Stripe checkout
 */

import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, HelpCircle, MessageCircle } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const CheckoutCancel = () => {
  useDocumentTitle('Checkout Cancelled');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Cancel Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-10 h-10 text-slate-500 dark:text-slate-400" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Checkout Cancelled
          </h1>

          <p className="text-slate-600 dark:text-slate-300 mb-8">
            No worries! Your payment was not processed. You can try again anytime or continue exploring VoraPrep.
          </p>

          {/* Options */}
          <div className="space-y-4 mb-8">
            <Link
              to="/"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            
            <Link
              to="/dashboard"
              className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue with Free Trial
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-left">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              Having issues?
            </h2>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• Make sure your card details are correct</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if the payment is being declined</li>
            </ul>
          </div>
        </div>

        {/* Support Note */}
        <div className="text-center mt-6">
          <a
            href="mailto:support@voraprep.com"
            className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Need help? Contact support
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
