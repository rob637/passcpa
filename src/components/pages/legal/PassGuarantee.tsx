import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, AlertCircle, Clock, FileText, CreditCard } from 'lucide-react';
import {
  PASS_GUARANTEE_CONFIG,
  PASS_GUARANTEE_REQUIREMENTS,
  PASS_GUARANTEE_CLAIM_POLICY,
  PASS_GUARANTEE_EXTENSION_TERMS,
  EXAM_PASSING_SCORES
} from '../../../config/passGuarantee';
import { useCourseOptional } from '../../../hooks/useCourse';

const PassGuarantee: React.FC = () => {
  const navigate = useNavigate();
  const courseContext = useCourseOptional();
  const courseId = courseContext?.courseId || 'cpa';
  const passingScore = EXAM_PASSING_SCORES[courseId];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">Pass Guarantee Terms</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8 not-prose">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10" />
              <h1 className="text-3xl font-bold">{PASS_GUARANTEE_CONFIG.name}</h1>
            </div>
            <p className="text-xl text-green-100 mb-2">{PASS_GUARANTEE_CONFIG.tagline}</p>
            <p className="text-green-50">{PASS_GUARANTEE_CONFIG.description}</p>
          </div>

          {/* How It Works */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              How It Works
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 not-prose">
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Subscribe & Study</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Subscribe and maintain an active subscription for at least 3 consecutive months before your exam.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Meet All Requirements</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Complete the study requirements below before your exam date.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Take Your Exam</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Attempt your official certification exam during your subscription period.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Submit Score Report</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">If you don't pass, submit your official score report within 30 days.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Get Free Extension</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">We'll extend your subscription for {PASS_GUARANTEE_EXTENSION_TERMS.monthsPerClaim} months at no charge so you can keep studying!</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Study Requirements */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary-600" />
              Study Requirements
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You must complete ALL of the following requirements before your exam date to qualify for the Pass Guarantee:
            </p>
            <div className="grid gap-4 not-prose">
              {PASS_GUARANTEE_REQUIREMENTS.map((req) => (
                <div 
                  key={req.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center">
                    {req.icon === 'CreditCard' && <CreditCard className="w-5 h-5" />}
                    {req.icon === 'BookOpen' && <FileText className="w-5 h-5" />}
                    {req.icon === 'CheckCircle' && <CheckCircle className="w-5 h-5" />}
                    {req.icon === 'Target' && <Clock className="w-5 h-5" />}
                    {req.icon === 'FileCheck' && <FileText className="w-5 h-5" />}
                    {req.icon === 'Award' && <Shield className="w-5 h-5" />}
                    {req.icon === 'Layers' && <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{req.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Claim Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-600" />
              Claim Policy
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 not-prose">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-4">Important Deadlines & Limits</h3>
              <ul className="space-y-3 text-amber-800 dark:text-amber-200">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Must be subscribed for at least <strong>{PASS_GUARANTEE_CLAIM_POLICY.minPaidMonths} consecutive months</strong> before your exam date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Must start studying at least <strong>{PASS_GUARANTEE_CLAIM_POLICY.minDaysBeforeExam} days</strong> before your exam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Score report must be submitted within <strong>{PASS_GUARANTEE_CLAIM_POLICY.maxDaysAfterFailure} days</strong> of your exam date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Applies to your first <strong>{PASS_GUARANTEE_CLAIM_POLICY.examAttemptLimit} exam attempts</strong> only</span>
                </li>
              </ul>
            </div>
          </section>

          {/* What You Need to Submit */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">What to Submit</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 not-prose">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                To claim your free extension, email <a href={`mailto:${PASS_GUARANTEE_CONFIG.supportContact}`} className="text-primary-600 hover:underline">{PASS_GUARANTEE_CONFIG.supportContact}</a> with:
              </p>
              <ul className="space-y-2">
                {PASS_GUARANTEE_CLAIM_POLICY.proofRequired.map((proof, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{proof}</span>
                  </li>
                ))}
              </ul>
              {passingScore && (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  For your exam, the passing score is: <strong>{passingScore.description}</strong>
                </p>
              )}
            </div>
          </section>

          {/* Extension Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              Extension Terms
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 not-prose">
              <ul className="space-y-3 text-green-800 dark:text-green-200">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>{PASS_GUARANTEE_EXTENSION_TERMS.monthsPerClaim} months free</strong> per successful claim</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Up to <strong>{PASS_GUARANTEE_EXTENSION_TERMS.maxClaimsPerSection} claims per exam section</strong> (max {PASS_GUARANTEE_EXTENSION_TERMS.monthsPerClaim * PASS_GUARANTEE_EXTENSION_TERMS.maxClaimsPerSection} months free total per section)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>If you've used all claims, continue at <strong>{PASS_GUARANTEE_EXTENSION_TERMS.discountAfterMaxClaims}% off</strong> regular price</span>
                </li>
              </ul>
            </div>
          </section>

          {/* What's NOT Covered */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              What's NOT Covered
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 not-prose">
              <ul className="space-y-2 text-red-800 dark:text-red-200">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Free trial periods do not count toward the 3-month minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Exam attempts before completing all study requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Score reports submitted more than 30 days after exam date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Exam attempts more than 30 days after subscription ended</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>This is NOT a money-back refund — it's a free subscription extension</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Why We Do This */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Why We Offer This Guarantee</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 not-prose text-slate-600 dark:text-slate-400">
              <p className="mb-4">
                We're confident in VoraPrep because our content is built by exam experts and tested by thousands of successful candidates. We've designed a study approach that, when followed completely, gives you the best chance of passing.
              </p>
              <p className="mb-4">
                The requirements above aren't arbitrary — they represent the minimum level of engagement we've found correlates with exam success. If you complete everything and still don't pass, we want to support you until you do.
              </p>
              <p>
                We ask for the 3-month minimum subscription and completed study requirements because we've learned that shortcuts don't work. Candidates who try to rush through the material or game the system rarely pass. Our guarantee rewards genuine effort.
              </p>
            </div>
          </section>

          {/* Questions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Questions?</h2>
            <p className="text-slate-600 dark:text-slate-400">
              If you have any questions about the Pass Guarantee, please contact us at{' '}
              <a 
                href={`mailto:${PASS_GUARANTEE_CONFIG.supportContact}`}
                className="text-primary-600 hover:underline"
              >
                {PASS_GUARANTEE_CONFIG.supportContact}
              </a>
            </p>
          </section>

          {/* Last Updated */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-8">
            Last updated: February 10, 2026
          </p>
        </div>
      </main>
    </div>
  );
};

export default PassGuarantee;
