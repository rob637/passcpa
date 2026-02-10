import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useCourse } from '../../../hooks/useCourse';
import { CourseId } from '../../../types/course';

/** Course-specific disclaimer text */
const COURSE_DISCLAIMERS: Record<CourseId, string> = {
  cpa: 'VoraPrep is an independent educational platform not affiliated with AICPA, NASBA, Prometric, or any state board of accountancy.',
  ea: 'VoraPrep is an independent educational platform not affiliated with the IRS, Treasury Department, or Prometric.',
  cma: 'VoraPrep is an independent educational platform not affiliated with the Institute of Management Accountants (IMA) or Prometric.',
  cia: 'VoraPrep is an independent educational platform not affiliated with The Institute of Internal Auditors (IIA) or Pearson VUE.',
  cisa: 'VoraPrep is an independent educational platform not affiliated with ISACA or any certification body.',
  cfp: 'VoraPrep is an independent educational platform not affiliated with the Certified Financial Planner Board of Standards (CFP Board).',
};

const Privacy: React.FC = () => {
  const { courseId } = useCourse();
  const disclaimer = COURSE_DISCLAIMERS[courseId] || COURSE_DISCLAIMERS.cpa;
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-600" />
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">Privacy Policy</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Last updated: January 25, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            {/* Independence Disclaimer */}
            <div className="not-prose mb-6 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {disclaimer}
              </p>
            </div>

            <h2>1. Information We Collect</h2>
            
            <h3>Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
              <li>Email address</li>
              <li>Display name</li>
              <li>Profile photo (optional)</li>
              <li>Exam date and section preferences</li>
            </ul>

            <h3>Study Data</h3>
            <p>To provide personalized learning, we collect:</p>
            <ul>
              <li>Practice question responses and scores</li>
              <li>Lesson completion progress</li>
              <li>Study time and streaks</li>
              <li>Performance analytics by topic</li>
            </ul>

            <h3>Technical Data</h3>
            <p>We automatically collect:</p>
            <ul>
              <li>Device type and browser information</li>
              <li>IP address and general location</li>
              <li>Usage patterns and feature interactions</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Provide and improve the Service</li>
              <li>Personalize your study experience with AI recommendations</li>
              <li>Track your progress and identify weak areas</li>
              <li>Send study reminders and notifications (if enabled)</li>
              <li>Analyze usage to improve our content and features</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>
              We do <strong>not</strong> sell your personal information. We may share data with:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Firebase (authentication, database), OpenAI (AI tutoring)</li>
              <li><strong>Analytics:</strong> Aggregated, anonymized usage data</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
            </ul>

            <h2>4. AI and Your Data</h2>
            <p>
              Our AI tutor uses your study data to provide personalized explanations. 
              Conversations with the AI tutor may be stored to improve the service. 
              We do not share your personal study data with third-party AI providers 
              in a way that identifies you.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul>
              <li>Encrypted data transmission (HTTPS/TLS)</li>
              <li>Secure cloud infrastructure (Firebase/Google Cloud)</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correct:</strong> Update inaccurate information</li>
              <li><strong>Delete:</strong> Request deletion of your account and data</li>
              <li><strong>Export:</strong> Download your study progress data</li>
              <li><strong>Opt-out:</strong> Disable notifications and reminders</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>
              We retain your data while your account is active. After account deletion, 
              we remove personal data within 30 days, though anonymized analytics may 
              be retained.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              VoraPrep is not intended for users under 18 years of age. We do not 
              knowingly collect data from children.
            </p>

            <h2>9. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management. 
              We may use analytics cookies to understand usage patterns.
            </p>

            <h2>10. Changes to Privacy Policy</h2>
            <p>
              We may update this policy periodically. We will notify you of significant 
              changes via email or in-app notification.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              For privacy-related questions or to exercise your rights, contact us at{' '}
              <a href="mailto:privacy@voraprep.com" className="text-primary-600 hover:underline">
                privacy@voraprep.com
              </a>
            </p>

            <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <p className="text-sm text-primary-800 dark:text-primary-200">
                <strong>California Residents:</strong> Under CCPA, you have additional rights 
                including the right to know what data we collect and request deletion. 
                Contact us to exercise these rights.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
