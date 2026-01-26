import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            to="/login" 
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">Terms of Service</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Last updated: January 25, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using PassCPA ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              PassCPA is an online CPA exam preparation platform that provides study materials, practice questions, 
              simulations, and AI-powered tutoring to help users prepare for the Uniform CPA Examination.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Share your account with others</li>
              <li>Copy, distribute, or reproduce our content without permission</li>
              <li>Attempt to reverse engineer or hack the Service</li>
              <li>Use the Service for any unlawful purpose</li>
              <li>Share exam questions or answers outside the platform</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on PassCPA, including but not limited to questions, explanations, lessons, 
              and software, is protected by intellectual property laws. You may not reproduce, 
              distribute, or create derivative works without our express written consent.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" without warranties of any kind. We do not guarantee 
              that you will pass the CPA exam by using our Service. Exam results depend on many 
              factors including individual effort and preparation.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              PassCPA shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising from your use of the Service.
            </p>

            <h2>8. Subscription and Billing</h2>
            <p>
              Certain features may require a paid subscription. By subscribing, you agree to 
              pay all applicable fees. Subscriptions auto-renew unless cancelled before the 
              renewal date.
            </p>

            <h2>9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for 
              violation of these terms or for any other reason at our discretion.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the Service 
              after changes constitutes acceptance of the new terms.
            </p>

            <h2>11. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:support@passcpa.com" className="text-primary-600 hover:underline">
                support@passcpa.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
