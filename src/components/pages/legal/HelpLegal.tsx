import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Shield, 
  Mail, 
  MessageCircle, 
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useCourse } from '../../../hooks/useCourse';
import { CourseId } from '../../../types/course';

// Course-specific disclaimer text
const COURSE_DISCLAIMERS: Record<CourseId, string> = {
  cpa: `VoraPrep is an independent educational resource and is not affiliated with, 
    endorsed by, or sponsored by the American Institute of Certified Public Accountants (AICPA), 
    the National Association of State Boards of Accountancy (NASBA), Prometric, or any state 
    board of accountancy.`,
  ea: `VoraPrep is an independent educational resource and is not affiliated with, 
    endorsed by, or sponsored by the Internal Revenue Service (IRS), Prometric, or any 
    government agency. "Enrolled Agent" is a designation granted by the U.S. Department of Treasury.`,
  cma: `VoraPrep is an independent educational resource and is not affiliated with, 
    endorsed by, or sponsored by the Institute of Management Accountants (IMA) or Prometric. 
    CMA® is a registered trademark of the Institute of Management Accountants.`,
  cia: `VoraPrep is an independent educational resource and is not affiliated with, 
    endorsed by, or sponsored by The Institute of Internal Auditors (IIA) or Pearson VUE. 
    CIA® is a registered trademark of The Institute of Internal Auditors.`,
  cfp: `VoraPrep is an independent educational resource and is not affiliated with, 
    endorsed by, or sponsored by the Certified Financial Planner Board of Standards, Inc. (CFP Board). 
    CFP® and CERTIFIED FINANCIAL PLANNER™ are trademarks owned by CFP Board.`,
  cisa: `VoraPrep is an independent educational resource and is not affiliated with, 
    endorsed by, or sponsored by ISACA or PSI Services. CISA® is a registered trademark of ISACA.`,
};

const HelpLegal: React.FC = () => {
  const { courseId } = useCourse();
  const navigate = useNavigate();
  const disclaimerText = COURSE_DISCLAIMERS[courseId] || COURSE_DISCLAIMERS.cpa;
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/you')}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-600" />
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">Help & Legal</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Support Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3 px-1">
            Support
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <a
              href="mailto:support@voraprep.com"
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Email Support</span>
                  <p className="text-xs text-slate-600">support@voraprep.com</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-600" />
            </a>

            <a
              href="mailto:feedback@voraprep.com"
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Send Feedback</span>
                  <p className="text-xs text-slate-600">Help us improve VoraPrep</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-600" />
            </a>
          </div>
        </div>

        {/* Legal Section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3 px-1">
            Legal
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Link
              to="/terms"
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Terms of Service</span>
                  <p className="text-xs text-slate-600">Usage terms and conditions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </Link>

            <Link
              to="/privacy"
              className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">Privacy Policy</span>
                  <p className="text-xs text-slate-600">How we handle your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <h3 className="text-amber-800 dark:text-amber-200 font-semibold mb-2">Important Notice</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {disclaimerText}
          </p>
        </div>

        {/* Version */}
        <div className="text-center text-xs text-slate-600 mt-8">
          <p>VoraPrep v1.1</p>
        </div>
      </main>
    </div>
  );
};

export default HelpLegal;
