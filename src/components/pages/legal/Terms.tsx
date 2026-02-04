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
            to="/help" 
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
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
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Last updated: January 25, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            {/* Important Disclaimer Banner */}
            <div className="not-prose mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
              <h3 className="text-amber-800 dark:text-amber-200 font-semibold mb-2">Important Notice</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                VoraPrep is an <strong>independent educational resource</strong> and is not affiliated with, 
                endorsed by, or sponsored by the American Institute of Certified Public Accountants (AICPA), 
                the National Association of State Boards of Accountancy (NASBA), Prometric, or any state 
                board of accountancy. "CPA" and "Certified Public Accountant" are professional designations 
                granted by state boards of accountancy, not by VoraPrep. All trademarks belong to their 
                respective owners.
              </p>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using VoraPrep ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              VoraPrep is an online CPA exam preparation platform that provides study materials, practice questions, 
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
              All content on VoraPrep, including but not limited to questions, explanations, lessons, 
              and software, is protected by intellectual property laws. You may not reproduce, 
              distribute, or create derivative works without our express written consent.
            </p>

            <h2>6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, 
              either express or implied, including but not limited to implied warranties of 
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            
            <h3>Educational Purpose Only</h3>
            <p>
              VoraPrep is an educational study aid designed to help users prepare for the CPA examination. 
              We make no guarantees regarding:
            </p>
            <ul>
              <li>Your performance on the actual CPA examination</li>
              <li>Passing any section of the CPA exam</li>
              <li>The accuracy of score predictions or readiness assessments</li>
              <li>The completeness of our content relative to actual exam coverage</li>
            </ul>
            <p>
              <strong>Exam results depend entirely on individual effort, preparation, prior knowledge, 
              and many other factors beyond our control.</strong> Our practice questions and simulations 
              are original educational content and may differ in format, difficulty, or style from 
              actual CPA exam questions.
            </p>

            <h3>Not Professional Advice</h3>
            <p>
              Content provided through VoraPrep, including AI tutor responses, is for educational 
              purposes only and does not constitute professional accounting, tax, legal, or financial 
              advice. Users should consult qualified professionals for specific guidance. Tax laws 
              and accounting standards change frequently; while we strive for accuracy, we cannot 
              guarantee all content reflects the most current regulations.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, VoraPrep and its officers, directors, 
              employees, agents, and affiliates shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul>
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Exam fees, retake costs, or related expenses</li>
              <li>Career delays or missed employment opportunities</li>
              <li>Emotional distress or frustration from exam results</li>
              <li>Costs of procuring substitute services</li>
            </ul>
            <p>
              Our total liability for any claims arising from your use of the Service shall not 
              exceed the amount you paid us in the twelve (12) months preceding the claim, or 
              fifty dollars ($50), whichever is greater.
            </p>

            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless VoraPrep, its affiliates, and their respective 
              officers, directors, employees, and agents from any claims, damages, losses, or expenses 
              (including reasonable attorney's fees) arising from your use of the Service, your 
              violation of these Terms, or your violation of any rights of another.
            </p>

            <h2>9. Subscription and Billing</h2>
            <p>
              Certain features may require a paid subscription. By subscribing, you agree to 
              pay all applicable fees. Subscriptions auto-renew unless cancelled before the 
              renewal date. Refunds are provided at our sole discretion.
            </p>

            <h2>10. Dispute Resolution and Arbitration</h2>
            <p>
              <strong>PLEASE READ THIS SECTION CAREFULLY – IT AFFECTS YOUR LEGAL RIGHTS.</strong>
            </p>
            <p>
              Any dispute arising from or relating to the Service shall be resolved through 
              binding arbitration administered by JAMS under its Streamlined Arbitration Rules. 
              The arbitration shall be conducted in English and held remotely via video conference 
              unless both parties agree otherwise.
            </p>
            <p>
              <strong>Class Action Waiver:</strong> You agree that any dispute resolution proceedings 
              will be conducted only on an individual basis and not in a class, consolidated, or 
              representative action.
            </p>
            <p>
              <strong>Exception:</strong> Either party may bring claims in small claims court if 
              eligible, and either party may seek injunctive relief in court for intellectual 
              property infringement.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the 
              State of Delaware, United States, without regard to its conflict of law provisions.
            </p>

            <h2>12. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for 
              violation of these terms or for any other reason at our discretion.
            </p>

            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining 
              provisions shall continue in full force and effect.
            </p>

            <h2>14. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement 
              between you and VoraPrep regarding the Service and supersede all prior agreements.
            </p>

            <h2>15. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. We will notify you of material changes 
              via email or in-app notification at least 30 days before they take effect. Continued 
              use of the Service after changes constitutes acceptance of the new terms.
            </p>

            <h2>16. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@voraprep.com" className="text-primary-600 hover:underline">
                legal@voraprep.com
              </a>
            </p>

            {/* Final Disclaimer */}
            <div className="not-prose mt-8 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                VoraPrep™ is a trademark of VoraPrep LLC. CPA®, Certified Public Accountant®, and 
                Uniform CPA Examination® are trademarks of the American Institute of Certified 
                Public Accountants (AICPA) and/or the National Association of State Boards of 
                Accountancy (NASBA). Becker®, Wiley®, Gleim®, Roger CPA Review®, and Surgent® are 
                trademarks of their respective owners. VoraPrep has no affiliation with these 
                organizations or companies.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
