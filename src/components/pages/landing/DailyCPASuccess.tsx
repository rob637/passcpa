/**
 * DailyCPASuccess — Checkout success confirmation page
 * 
 * Public page at /daily-cpa/success. Shown after Stripe checkout completes.
 */

import { Link, useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  CheckCircle,
  PartyPopper,
  ArrowRight,
} from 'lucide-react';

export const DailyCPASuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/daily-cpa" className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg text-slate-900">VoraPrep Daily CPA</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          You're all set! 🎉
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Your VoraPrep Daily CPA subscription is active. Your daily questions
          will continue arriving via text at your scheduled time.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-blue-900 mb-3">What happens next:</h2>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              Your daily questions will arrive at your scheduled time
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              Your streak and progress carry over from your trial
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              Reply to texts just like before — A, B, C, or D
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              Text HELP anytime for options
            </li>
          </ul>
        </div>

        <Link
          to="/cpa"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Explore full VoraPrep CPA course
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-xs text-slate-400 mt-8">
          Questions? Contact <a href="mailto:support@voraprep.com" className="text-blue-500 hover:underline">support@voraprep.com</a>
        </p>
      </div>
    </div>
  );
};

export default DailyCPASuccess;
