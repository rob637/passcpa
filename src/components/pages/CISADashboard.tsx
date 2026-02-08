import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { 
  Play, 
  Target, 
  Calendar, 
  TrendingUp, 
  Clock,
  ChevronRight,
  BookOpen,
  Zap,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { CISA_SECTIONS } from '../../courses/cisa';
import { 
  CISAAnalytics, 
  initializeAnalytics, 
  getAnalyticsSummary,
  getStudyPlanProgress,
  deserializeAnalytics,
} from '../../services/cisaAnalytics';

export default function CISADashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<CISAAnalytics | null>(null);
  
  // Load analytics from localStorage or initialize
  useEffect(() => {
    const loadAnalytics = () => {
      try {
        const stored = localStorage.getItem('cisa_analytics');
        if (stored) {
          setAnalytics(deserializeAnalytics(stored));
        } else {
          setAnalytics(initializeAnalytics('user'));
        }
      } catch {
        setAnalytics(initializeAnalytics('user'));
      }
      setLoading(false);
    };
    
    const timer = setTimeout(loadAnalytics, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Compute summary and progress
  const summary = useMemo(() => {
    if (!analytics) return null;
    return getAnalyticsSummary(analytics);
  }, [analytics]);
  
  const studyProgress = useMemo(() => {
    if (!analytics) return null;
    return getStudyPlanProgress(analytics);
  }, [analytics]);
  
  // Calculate days to exam (placeholder - would come from user settings)
  const daysToExam = useMemo(() => {
    const examDate = localStorage.getItem('cisa_exam_date');
    if (examDate) {
      const diff = new Date(examDate).getTime() - Date.now();
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
    return null;
  }, []);
  
  // Map domain mastery to section progress
  const sectionProgress = useMemo(() => {
    if (!analytics) {
      return {
        CISA1: { progress: 0, mastery: 0, accuracy: 0 },
        CISA2: { progress: 0, mastery: 0, accuracy: 0 },
        CISA3: { progress: 0, mastery: 0, accuracy: 0 },
        CISA4: { progress: 0, mastery: 0, accuracy: 0 },
        CISA5: { progress: 0, mastery: 0, accuracy: 0 },
      } as Record<string, { progress: number; mastery: number; accuracy: number }>;
    }
    
    const result: Record<string, { progress: number; mastery: number; accuracy: number }> = {};
    Object.entries(analytics.domainMastery).forEach(([domain, mastery]) => {
      // Progress based on questions attempted (target: 50 per domain)
      const progress = Math.min(100, Math.round((mastery.questionsAttempted / 50) * 100));
      // Mastery score (0-100 based on level)
      const masteryScore = 
        mastery.masteryLevel === 'expert' ? 90 :
        mastery.masteryLevel === 'proficient' ? 75 :
        mastery.masteryLevel === 'developing' ? 50 : 25;
      
      result[domain] = {
        progress,
        mastery: masteryScore,
        accuracy: mastery.accuracy,
      };
    });
    return result;
  }, [analytics]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CISA Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Certified Information Systems Auditor</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="secondary"
            onClick={() => navigate('/cisa/study-plan')}
            leftIcon={Calendar}
          >
            Study Plan
          </Button>
          <Button 
            variant="primary"
            onClick={() => navigate('/cisa-exam')}
            leftIcon={Play}
          >
            Launch Exam Sim
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Overall Progress" 
          value={`${studyProgress?.overallProgress || 0}%`} 
          subtitle={studyProgress?.nextMilestone || 'Start practicing'} 
          icon={<Target className="h-6 w-6 text-indigo-600" />} 
          bg="bg-indigo-50 dark:bg-indigo-900/30" 
        />
        <StatCard 
          title="Exam Readiness" 
          value={summary?.overview.passChance || '0%'} 
          subtitle={summary?.overview.readiness || 'Not Ready'} 
          icon={<TrendingUp className="h-6 w-6 text-green-600" />} 
          bg="bg-green-50 dark:bg-green-900/30" 
        />
        <StatCard 
          title="Study Streak" 
          value={`${analytics?.currentStreak || 0} Days`} 
          subtitle={`Best: ${analytics?.longestStreak || 0} days`} 
          icon={<Clock className="h-6 w-6 text-amber-600" />} 
          bg="bg-amber-50 dark:bg-amber-900/30" 
        />
        <StatCard 
          title={daysToExam !== null ? "Days to Exam" : "Scaled Score"} 
          value={daysToExam !== null ? String(daysToExam) : String(analytics?.estimatedScaledScore || 200)} 
          subtitle={daysToExam !== null ? "Stay focused!" : "450 = Passing"} 
          icon={<Calendar className="h-6 w-6 text-blue-600" />} 
          bg="bg-blue-50 dark:bg-blue-900/30" 
        />
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickActionCard 
          icon={<BookOpen className="h-5 w-5" />}
          title="Practice Questions"
          onClick={() => navigate('/cisa/practice')}
          color="text-indigo-600"
        />
        <QuickActionCard 
          icon={<Zap className="h-5 w-5" />}
          title="Cram Mode"
          onClick={() => navigate('/cisa/cram')}
          color="text-amber-600"
        />
        <QuickActionCard 
          icon={<Award className="h-5 w-5" />}
          title="Mock Exam"
          onClick={() => navigate('/cisa-exam')}
          color="text-green-600"
        />
        <QuickActionCard 
          icon={<Target className="h-5 w-5" />}
          title="Flashcards"
          onClick={() => navigate('/cisa/flashcards')}
          color="text-purple-600"
        />
      </div>
      
      {/* Recommendations */}
      {summary && summary.recommendations.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-200">Recommendations</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-300">
                {summary.recommendations.slice(0, 3).map((rec, i) => (
                  <li key={i}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Domains */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exam Domains</h2>
        <div className="grid grid-cols-1 gap-4">
          {CISA_SECTIONS.map((section) => (
            <button 
              key={section.id} 
              onClick={() => navigate(`/cisa/section/${section.id}`)}
              className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 w-full text-left"
            >
              <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center text-white font-bold shrink-0`}>
                {section.id.replace('CISA', '')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">{section.title}</h3>
                <p className="text-sm text-gray-500 truncate">{section.description}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="flex flex-col items-end w-24">
                  <span className="text-xs text-gray-400 mb-1">Progress</span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${sectionProgress[section.id]?.progress || 0}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col items-center w-20">
                  <span className="text-xs text-gray-400 mb-1">Accuracy</span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                    (sectionProgress[section.id]?.accuracy || 0) >= 70 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    (sectionProgress[section.id]?.accuracy || 0) >= 50 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {sectionProgress[section.id]?.accuracy || 0}%
                  </span>
                </div>
                <div className="flex flex-col items-center w-16">
                  <span className="text-xs text-gray-400 mb-1">Weight</span>
                  <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">{section.weight}%</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, bg }: { title: string; value: string; subtitle: string; icon: React.ReactNode; bg: string }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
      </div>
    </Card>
  );
}

function QuickActionCard({ icon, title, onClick, color }: { icon: React.ReactNode; title: string; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick} className="text-left w-full">
      <Card
        variant="interactive"
        className="p-4 flex flex-col items-center gap-2 text-center h-full"
      >
        <div className={`${color}`}>{icon}</div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
      </Card>
    </button>
  );
}
