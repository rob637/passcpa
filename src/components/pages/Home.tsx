import { useState, useEffect } from 'react';
import logger from '../../utils/logger';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileSpreadsheet,
  ChevronDown,
  Calendar,
  Flame,
  Target,
  Brain,
  TrendingUp,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CPA_SECTIONS, CORE_SECTIONS, DISCIPLINE_SECTIONS_2026 } from '../../config/examConfig';
import { differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { calculateExamReadiness, ReadinessData } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';
import DailyPlanCard from '../DailyPlanCard';
import StudyTimeCard from '../StudyTimeCard';

// Tutor messages based on context
const getTutorMessage = (streak: number, readiness: number, timeOfDay: string): string => {
  if (streak >= 7 && readiness >= 70) {
    return "You're on fire! Keep this momentum going.";
  }
  if (streak >= 3) {
    return "Building consistency. That's how you pass.";
  }
  if (timeOfDay === 'morning') {
    return "Fresh mind, fresh start. Let's make progress.";
  }
  if (timeOfDay === 'evening') {
    return "End of day study? You're dedicated. Let's go.";
  }
  if (readiness < 50) {
    return "Every question gets you closer. Let's build.";
  }
  return "Ready when you are. Let's learn something.";
};

const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const Home = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const { currentStreak, stats, refreshStats } = useStudy();
  const { courseId } = useCourse();
  
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null);
  const [_loading, setLoading] = useState(true);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [changingSection, setChangingSection] = useState(false);

  // Get user info
  const profile = userProfile as any;
  const firstName = profile?.displayName?.split(' ')[0] || 'there';
  
  // Use local state for section so we can update immediately
  const [activeSection, setActiveSection] = useState<string>(profile?.examSection || 'FAR');
  
  // Sync local state when profile loads/changes
  useEffect(() => {
    if (profile?.examSection && profile.examSection !== activeSection) {
      setActiveSection(profile.examSection);
    }
  }, [profile?.examSection]);
  
  const sectionInfo = CPA_SECTIONS[activeSection as keyof typeof CPA_SECTIONS];
  
  // Calculate days until exam
  const examDate = profile?.examDate;
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

  // Load readiness data - depends on activeSection (local state)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Find lessons for this section
        const lessons = await fetchAllLessons(courseId);
        const lessonProgress = profile?.lessonProgress || {};
        
        // Filter lessons by section
        const sectionLessons = lessons.filter(l => l.section === activeSection);
        const completedCount = sectionLessons.filter(l => lessonProgress[l.id] >= 100).length;

        // Calculate readiness using the proper signature
        const topicPerformance: { id: string; topic: string; accuracy: number; questions: number }[] = [];
        const readiness = calculateExamReadiness(
          stats || { totalQuestions: 0, accuracy: 0 },
          topicPerformance,
          completedCount,
          sectionLessons.length
        );
        setReadinessData(readiness);
      } catch (error) {
        logger.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeSection, stats, courseId, profile?.lessonProgress]);

  // Handle section change - update local state immediately, then persist
  const handleSectionChange = async (newSection: string) => {
    if (newSection === activeSection) {
      setShowSectionPicker(false);
      return;
    }
    
    // Update local state immediately for instant UI update
    setActiveSection(newSection);
    setShowSectionPicker(false);
    setChangingSection(true);
    
    try {
      // Persist to Firebase
      await updateUserProfile({ examSection: newSection });
      
      // Refresh study stats for new section
      if (refreshStats) {
        await refreshStats();
      }
    } catch (error) {
      logger.error('Error changing section:', error);
      // Revert on error
      setActiveSection(profile?.examSection || 'FAR');
    } finally {
      setChangingSection(false);
    }
  };

  const tutorMessage = getTutorMessage(
    currentStreak,
    readinessData?.overall || 0,
    getTimeOfDay()
  );

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Section Picker Modal */}
      {showSectionPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Change Exam Section</h2>
              <button 
                onClick={() => setShowSectionPicker(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto">
              {(() => {
                // Determine available sections based on user's exam date
                const BLUEPRINT_CUTOFF = new Date('2026-07-01');
                const userExamDate = examDate ? new Date(examDate) : new Date();
                const is2025Blueprint = userExamDate < BLUEPRINT_CUTOFF;
                const disciplineSections = is2025Blueprint
                  ? ['BEC']
                  : DISCIPLINE_SECTIONS_2026;
                
                return (
                  <>
                    {/* Core Sections */}
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Core Sections (Required)</div>
                    {CORE_SECTIONS.map((sectionKey) => {
                      const section = CPA_SECTIONS[sectionKey as keyof typeof CPA_SECTIONS];
                      const isSelected = sectionKey === activeSection;
                      return (
                        <button
                          key={sectionKey}
                          onClick={() => handleSectionChange(sectionKey)}
                          disabled={changingSection}
                          className={clsx(
                            'w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
                            isSelected
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                          )}
                        >
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: section?.color || '#6366f1' }}
                          >
                            {section?.shortName || sectionKey}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {section?.name || sectionKey}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {section?.description?.split('.')[0] || ''}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-primary-600" />
                          )}
                        </button>
                      );
                    })}
                    
                    {/* Discipline Sections */}
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-4 mb-2">
                      Discipline (Choose One)
                      {is2025Blueprint && <span className="text-amber-600 ml-1">• 2025 Blueprint</span>}
                    </div>
                    {disciplineSections.map((sectionKey) => {
                      const section = CPA_SECTIONS[sectionKey as keyof typeof CPA_SECTIONS];
                      const isSelected = sectionKey === activeSection;
                      const isBEC = sectionKey === 'BEC';
                      return (
                        <button
                          key={sectionKey}
                          onClick={() => handleSectionChange(sectionKey)}
                          disabled={changingSection}
                          className={clsx(
                            'w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
                            isSelected
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600',
                            isBEC && 'border-amber-300 dark:border-amber-700'
                          )}
                        >
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: section?.color || '#6366f1' }}
                          >
                            {section?.shortName || sectionKey}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              {section?.name || sectionKey}
                              {isBEC && <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">2025</span>}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {section?.description?.split('.')[0] || ''}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-primary-600" />
                          )}
                        </button>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Header: Greeting + Stats Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm italic">
              "{tutorMessage}"
            </p>
          </div>
        </div>
        
        {/* Section Selector + Stats Row */}
        <div className="flex items-center justify-between">
          {/* Tappable Section Selector */}
          <button
            onClick={() => setShowSectionPicker(true)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
            >
              {sectionInfo?.shortName?.charAt(0) || activeSection.charAt(0)}
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
              {sectionInfo?.name || activeSection}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Right side stats */}
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 dark:bg-orange-900/30 rounded-lg"
              title={`${currentStreak} day streak`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-semibold text-orange-700 dark:text-orange-400">{currentStreak}</span>
            </div>
            
            {daysUntilExam !== null && daysUntilExam > 0 && (
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{daysUntilExam}d</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exam Date Prompt - Show when no exam date set */}
      {!examDate && (
        <Link
          to="/settings"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-700 rounded-xl hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              When is your {sectionInfo?.shortName || activeSection} exam?
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Set your exam date for personalized study pacing
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-primary-500" />
        </Link>
      )}

      {/* Today's Personalized Plan - This IS the primary CTA now */}
      <DailyPlanCard compact />

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          to="/learn"
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Lessons</span>
        </Link>
        
        <Link
          to="/practice"
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Questions</span>
        </Link>
        
        <Link
          to="/tbs"
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">TBS</span>
        </Link>
      </div>

      {/* Study Time Card - Becker-style donut chart */}
      <StudyTimeCard />

      {/* More Options (collapsible feel, always visible) */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">More Ways to Study</p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/flashcards"
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors"
          >
            <Brain className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Flashcards</span>
          </Link>
          
          <Link
            to="/quiz"
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Timed Quiz</span>
          </Link>

          <Link
            to="/exam"
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors"
          >
            <Target className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Mock Exam</span>
          </Link>

          <Link
            to="/ai-tutor"
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ask Vory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
