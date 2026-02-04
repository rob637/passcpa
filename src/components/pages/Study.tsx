import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  HelpCircle,
  ChevronRight,
  Brain,
  GraduationCap,
  Sparkles,
  FileSpreadsheet,
  PenTool,
  LucideIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CPA_SECTIONS } from '../../config/examConfig';
import { fetchLessonById } from '../../services/lessonService';
import clsx from 'clsx';
import DailyPlanCard from '../DailyPlanCard';

interface StudyMode {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'error' | 'slate';
  link: string;
  recommended?: boolean;
  badge?: string;
}

const Study = () => {
  const { userProfile } = useAuth();
  const { todayLog, dailyProgress, dailyGoalMet } = useStudy();
  const { courseId: _courseId } = useCourse();
  const [recentItems, setRecentItems] = useState<{ type: string; title: string; subtitle: string; link: string }[]>([]);

  const currentSection = userProfile?.examSection || 'REG';
  const sectionInfo = CPA_SECTIONS[currentSection as keyof typeof CPA_SECTIONS];

  // Build recent items from today's activities (async)
  useEffect(() => {
    const fetchRecentItems = async () => {
      if (!todayLog?.activities || !Array.isArray(todayLog.activities)) {
        setRecentItems([]);
        return;
      }

      // Get unique items (dedupe by lessonId or topic), most recent first
      const seen = new Set<string>();
      const items: { type: string; title: string; subtitle: string; link: string }[] = [];

      // Sort by timestamp descending (most recent first)
      const sortedActivities = [...todayLog.activities].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      for (const activity of sortedActivities) {
        if (items.length >= 5) break; // Show max 5 recent items

        if (activity.type === 'lesson' && activity.lessonId) {
          if (seen.has(activity.lessonId)) continue;
          seen.add(activity.lessonId);

          const lesson = await fetchLessonById(activity.lessonId);
          items.push({
            type: 'lesson',
            title: lesson?.title || activity.lessonId,
            subtitle: 'Completed today',
            link: `/lessons/${activity.lessonId}`,
          });
        } else if (activity.type === 'mcq' && activity.topic) {
          const topicKey = `mcq-${activity.topic}`;
          if (seen.has(topicKey)) continue;
          seen.add(topicKey);

          items.push({
            type: 'practice',
            title: activity.topic,
            subtitle: activity.isCorrect ? 'Answered correctly' : 'Needs review',
            link: '/practice',
          });
        } else if (activity.type === 'simulation' && activity.id) {
          if (seen.has(activity.id)) continue;
          seen.add(activity.id);

          items.push({
            type: 'simulation',
            title: `TBS: ${activity.id}`,
            subtitle: `Score: ${activity.score}%`,
            link: `/tbs/${activity.id}`,
          });
        }
      }

      setRecentItems(items);
    };

    fetchRecentItems();
  }, [todayLog?.activities]);

  // Study modes - expanded with new training types
  const studyModes: StudyMode[] = [
    {
      id: 'continue',
      title: 'Continue Learning',
      description: 'Pick up where you left off with your current lesson',
      icon: BookOpen,
      color: 'primary',
      link: '/lessons',
      recommended: true,
    },
    {
      id: 'practice',
      title: 'Practice Questions',
      description: 'Test your knowledge with MCQ questions',
      icon: HelpCircle,
      color: 'success',
      link: '/practice',
    },
    {
      id: 'tbs',
      title: 'Task-Based Simulations',
      description: 'Practice real exam TBS like journal entries, reconciliations',
      icon: FileSpreadsheet,
      color: 'warning',
      link: '/tbs',
    },
    // Written Communication - Required for BEC section
    ...(currentSection === 'BEC' ? [{
      id: 'wc',
      title: 'Written Communication',
      description: 'Practice professional memos, letters, and reports',
      icon: PenTool,
      color: 'primary' as const,
      link: '/written-communication',
      badge: 'BEC',
    }] : []),
    {
      id: 'flashcards',
      title: 'Flashcard Review',
      description: 'Smart review for long-term retention',
      icon: Brain,
      color: 'success',
      link: '/flashcards',
      badge: 'SMART',
    },
    {
      id: 'exam',
      title: 'Exam Simulator',
      description: 'Full exam experience with MCQs + TBS testlets',
      icon: GraduationCap,
      color: 'error',
      link: '/exam',
      badge: '4 HRS',
    },
    {
      id: 'tutor',
      title: 'Ask Vory',
      description: 'Get personalized help from your AI study partner',
      icon: Sparkles,
      color: 'slate',
      link: '/ai-tutor',
    },
  ];

  type ColorConfig = {
    bg: string;
    icon: string;
    border: string;
    hover: string;
  };

  const colorClasses: Record<string, ColorConfig> = {
    primary: {
      bg: 'bg-primary-100',
      icon: 'text-primary-600',
      border: 'border-primary-200',
      hover: 'hover:border-primary-400',
    },
    success: {
      bg: 'bg-success-100',
      icon: 'text-success-600',
      border: 'border-success-200',
      hover: 'hover:border-success-400',
    },
    warning: {
      bg: 'bg-warning-100',
      icon: 'text-warning-600',
      border: 'border-warning-200',
      hover: 'hover:border-warning-400',
    },
    error: {
      bg: 'bg-error-100',
      icon: 'text-error-600',
      border: 'border-error-200',
      hover: 'hover:border-error-400',
    },
    slate: {
      bg: 'bg-slate-100',
      icon: 'text-slate-600',
      border: 'border-slate-200',
      hover: 'hover:border-slate-400',
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto page-transition">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: sectionInfo?.color }}
          >
            {sectionInfo?.shortName}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Study Session</h1>
            <p className="text-slate-600">Choose how you want to study today</p>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Today's Progress</h2>
            <span
              className={clsx(
                'text-sm font-medium',
                dailyGoalMet ? 'text-success-600' : 'text-slate-600'
              )}
            >
              {dailyGoalMet ? 'Goal Complete! 🎉' : `${dailyProgress}% of goal`}
            </span>
          </div>

          <div className="relative mb-4">
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full transition-all duration-500 rounded-full',
                  dailyGoalMet
                    ? 'bg-gradient-to-r from-success-500 to-success-400'
                    : 'bg-gradient-to-r from-primary-500 to-primary-400'
                )}
                style={{ width: `${Math.min(100, dailyProgress)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-slate-900">{todayLog?.earnedPoints || 0}</div>
              <div className="text-xs text-slate-600">Points Earned</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">
                {todayLog?.questionsAttempted || 0}
              </div>
              <div className="text-xs text-slate-600">Questions</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">
                {Math.round(todayLog?.studyTimeMinutes || 0)}
              </div>
              <div className="text-xs text-slate-600">Minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Study Modes */}
      <div className="space-y-4">
        <h2 className="font-semibold text-slate-900">Choose Study Mode</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {studyModes.map((mode) => {
            const colors = colorClasses[mode.color];

            return (
              <Link
                key={mode.id}
                to={mode.link}
                className={clsx(
                  'card p-5 border-2 transition-all hover:shadow-md group relative',
                  colors.border,
                  colors.hover
                )}
              >
                {mode.recommended && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                {mode.badge && !mode.recommended && (
                  <span className="absolute -top-2 -right-2 bg-slate-700 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {mode.badge}
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={clsx(
                      'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                      colors.bg
                    )}
                  >
                    <mode.icon className={clsx('w-6 h-6', colors.icon)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{mode.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Personalized Daily Plan */}
      <div className="mt-8">
        <DailyPlanCard />
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="font-semibold text-slate-900 mb-4">Continue Where You Left Off</h2>

        <div className="card">
          <div className="divide-y divide-slate-100">
            {recentItems.length === 0 ? (
              <div className="p-8 text-center text-slate-600">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No recent activity yet.</p>
                <p className="text-sm">Start a lesson or practice session to track your progress!</p>
              </div>
            ) : (
              recentItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div
                    className={clsx(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      item.type === 'lesson' ? 'bg-primary-100' : 'bg-success-100'
                    )}
                  >
                    {item.type === 'lesson' ? (
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    ) : (
                      <HelpCircle className="w-5 h-5 text-success-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{item.title}</h4>
                    <div className="text-sm text-slate-600">{item.subtitle}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
