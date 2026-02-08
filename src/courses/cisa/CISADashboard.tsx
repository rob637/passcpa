/**
 * CISA Dashboard Component
 * 
 * World-class dashboard for Certified Information Systems Auditor exam prep.
 * Features:
 * - Domain progress tracking across 5 ISACA domains
 * - Overall readiness score and pass probability
 * - Quick practice and exam simulation access
 * - Study streak and engagement metrics
 * - Weak area identification and prioritization
 */

import { 
  BookOpen, 
  Target, 
  Clock, 
  Award, 
  ChevronRight,
  BarChart2,
  Shield,
  Server,
  FileSearch,
  Building,
  Code,
  Zap,
  TrendingUp,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCISAProgress } from '../../hooks/useCISAProgress';
import { CISA_SECTIONS, CISA_SECTION_CONFIG, CISASectionId } from './config';
import { PageLoader } from '../../components/common/PageLoader';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

// Icon mapping for domains
const DOMAIN_ICONS: Record<CISASectionId, React.ElementType> = {
  CISA1: FileSearch,
  CISA2: Building,
  CISA3: Code,
  CISA4: Server,
  CISA5: Shield,
};

// Color mapping for domains
const DOMAIN_COLORS: Record<CISASectionId, { bg: string; text: string; border: string }> = {
  CISA1: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' },
  CISA2: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  CISA3: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800' },
  CISA4: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-800' },
  CISA5: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
};

export default function CISADashboard() {
  const navigate = useNavigate();
  const { progress, loading } = useCISAProgress();

  if (loading) {
    return <PageLoader />;
  }

  // Calculate metrics from progress
  const overallReadiness = progress?.readinessScore || 0;
  const questionsAttempted = progress?.totalQuestionsAttempted || 0;
  const streak = progress?.streakDays || 0;
  const accuracy = Math.round(progress?.overallAccuracy || 0);
  const passProbability = progress?.passProbability || 0;
  const weakDomains = progress?.weakDomains || [];
  const daysUntilExam = progress?.daysUntilExam;
  const studyHoursThisWeek = progress?.studyHoursThisWeek || 0;

  // Get pass status color
  const getPassProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (prob >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">CISA Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              2026 Exam
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Certified Information Systems Auditor® Exam Prep</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="secondary"
            onClick={() => navigate('/cisa/simulations')}
            leftIcon={Server}
            className="border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 bg-white dark:bg-slate-900"
          >
            Practice Simulations
          </Button>
          <Button 
            variant="primary"
            onClick={() => navigate('/cisa/practice/quick')}
            leftIcon={Target}
            className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
          >
            Quick Practice
          </Button>
        </div>
      </div>

      {/* Weak Areas Alert */}
      {weakDomains.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">Focus Areas Identified</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              Based on your performance, prioritize: {weakDomains.map(d => CISA_SECTION_CONFIG[d as CISASectionId]?.shortTitle).join(', ')}
            </p>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cisa/practice/weak')}
              className="mt-2 text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200"
              rightIcon={ChevronRight}
            >
              Practice Weak Areas
            </Button>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Readiness */}
        <Card className="p-6 border-indigo-100 dark:border-indigo-900/30 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/10">
          <div className="flex items-center justify-between pb-2">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Readiness</div>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{overallReadiness}%</div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${overallReadiness}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Pass Probability: <span className={`font-semibold ${getPassProbabilityColor(passProbability)}`}>{passProbability}%</span>
          </p>
        </Card>
        
        {/* Questions Practiced */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <div className="text-sm font-medium text-slate-500">Questions Practiced</div>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {questionsAttempted} <span className="text-sm font-normal text-slate-400">/ 1,100+</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 5 ISACA Domains</p>
        </Card>

        {/* Study Streak */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <div className="text-sm font-medium text-slate-500">Study Streak</div>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {streak} <span className="text-sm font-normal text-slate-400">Days</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {studyHoursThisWeek}h this week
          </p>
        </Card>

        {/* Accuracy */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-2">
            <div className="text-sm font-medium text-slate-500">Accuracy</div>
            <BarChart2 className="h-4 w-4 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{accuracy}%</div>
          <p className="text-xs text-slate-500 mt-1">Last 50 questions</p>
        </Card>
      </div>

      {/* Exam Countdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Countdown */}
        {daysUntilExam !== undefined && (
          <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Exam Countdown</span>
            </div>
            <div className="text-4xl font-bold mb-2">{daysUntilExam} days</div>
            <p className="text-indigo-200 text-sm">
              {daysUntilExam <= 7 ? 'Final push! Focus on weak areas.' :
               daysUntilExam <= 30 ? 'Time for intensive practice.' :
               'Stay consistent with your study plan.'}
            </p>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className={`p-6 ${daysUntilExam !== undefined ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigate('/cisa/exam-simulator')}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left group"
            >
              <Clock className="w-6 h-6 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">Full Exam</span>
              <p className="text-xs text-slate-500 mt-1">150 questions, 4 hrs</p>
            </button>
            
            <button 
              onClick={() => navigate('/cisa/cram')}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all text-left group"
            >
              <Zap className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">Cram Mode</span>
              <p className="text-xs text-slate-500 mt-1">High-yield topics</p>
            </button>
            
            <button 
              onClick={() => navigate('/cisa/flashcards')}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all text-left group"
            >
              <BookOpen className="w-6 h-6 text-teal-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">Flashcards</span>
              <p className="text-xs text-slate-500 mt-1">Spaced repetition</p>
            </button>
            
            <button 
              onClick={() => navigate('/cisa/analytics')}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-left group"
            >
              <TrendingUp className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-900 dark:text-white text-sm">Analytics</span>
              <p className="text-xs text-slate-500 mt-1">Track progress</p>
            </button>
          </div>
        </Card>
      </div>

      {/* Domain Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-500" />
          ISACA Job Practice Domains
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CISA_SECTIONS.map((section) => {
            const Icon = DOMAIN_ICONS[section.id];
            const colors = DOMAIN_COLORS[section.id];
            const domainProgress = progress?.domainProgress?.[section.id] || 0;
            const domainAccuracy = progress?.domainAccuracy?.[section.id] || 0;
            const isWeak = weakDomains.includes(section.id);
            
            return (
              <div 
                key={section.id} 
                className={`group bg-white dark:bg-slate-800 rounded-xl border ${isWeak ? 'border-amber-300 dark:border-amber-700' : 'border-slate-200 dark:border-slate-700'} p-5 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-indigo-900/5 relative overflow-hidden`}
                onClick={() => navigate(`/cisa/domain/${section.id}`)}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 opacity-20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                
                {/* Weak area badge */}
                {isWeak && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-medium">
                    Needs Work
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${colors.bg} ${colors.text}`}>
                    {section.weight}%
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {section.shortTitle}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                  {section.description.substring(0, 100)}...
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{domainProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${domainProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Accuracy</span>
                    <span className={`text-sm font-bold ${domainAccuracy >= 75 ? 'text-emerald-600' : domainAccuracy >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                      {domainAccuracy}%
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity / Study Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Tips */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">CISA Exam Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">1</span>
              </div>
              <span className="text-slate-600 dark:text-slate-300">
                Focus on <strong>Domain 4 & 5</strong> which together account for 52% of the exam
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">2</span>
              </div>
              <span className="text-slate-600 dark:text-slate-300">
                Memorize key <strong>ISACA frameworks</strong>: COBIT, ITIL, ISO 27001
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">3</span>
              </div>
              <span className="text-slate-600 dark:text-slate-300">
                Think like an <strong>auditor</strong>: independence, risk-based approach, evidence
              </span>
            </li>
          </ul>
        </Card>

        {/* Pass Guarantee Progress */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800 border-emerald-200 dark:border-emerald-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Pass Guarantee Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-300">Questions Completed</span>
                <span className="font-medium">{Math.min(questionsAttempted, 1000)} / 1,000</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((questionsAttempted / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-300">Mock Exams Passed</span>
                <span className="font-medium">{progress?.mockExamsPassed || 0} / 2</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${((progress?.mockExamsPassed || 0) / 2) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Complete all requirements to qualify for our Pass Guarantee program.{' '}
              <a href="/cisa/pass-guarantee" className="text-emerald-600 hover:underline">Learn more →</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
