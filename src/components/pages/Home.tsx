import { useState, useEffect } from 'react';
import logger from '../../utils/logger';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import {
  BookOpen,
  FileSpreadsheet,
  FileText,
  ChevronDown,
  Calendar,
  Flame,
  Target,
  Brain,
  TrendingUp,
  Check,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CORE_SECTIONS, DISCIPLINE_SECTIONS_2026 } from '../../config/examConfig';
import { getSectionDisplayInfo, getDefaultSection } from '../../utils/sectionUtils';
import { getExamDate, getCurrentSection } from '../../utils/profileHelpers';
import { differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { calculateExamReadiness, ReadinessData } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';
import { 
  getCoursePracticePath, 
  getCourseFlashcardPath, 
  getCourseQuizPath, 
  getCourseExamPath,
  getCourseTBSPath,
  getCourseEssayPath,
  getCourseCBQPath,
} from '../../utils/courseNavigation';
import { CourseId } from '../../types/course';
import DailyPlanCard from '../DailyPlanCard';
import StudyTimeCard from '../StudyTimeCard';
import { BottomSheet } from '../common/BottomSheet';
import { ShareNudge, useDashboardShareNudge, shouldShowStreakNudge, shouldShowQuestionsMilestone } from '../common/ShareNudge';

// Derive courseId from exam section name
const getCourseFromSection = (section: string): CourseId => {
  const upper = section.toUpperCase();
  if (['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'BEC'].includes(upper)) return 'cpa';
  if (upper.startsWith('SEE')) return 'ea';
  if (upper.startsWith('CMA')) return 'cma';
  if (upper.startsWith('CIA')) return 'cia';
  if (upper.startsWith('CISA')) return 'cisa';
  if (upper.startsWith('CFP')) return 'cfp';
  return 'cpa';
};

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
  const navigate = useNavigate();
  const { user, userProfile, updateUserProfile } = useAuth();
  const { currentStreak, stats, refreshStats } = useStudy();
  const { courseId, course, setCourse } = useCourse();
  
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null);
  const [_loading, setLoading] = useState(true);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [changingSection, setChangingSection] = useState(false);
  const [hasDiagnosticResult, setHasDiagnosticResult] = useState<boolean | null>(null);
  const showDashboardNudge = useDashboardShareNudge();

  // Check for milestone-based share nudges
  const totalQuestionsAnswered = stats?.totalQuestions || 0;
  const showStreakNudge = shouldShowStreakNudge(currentStreak);
  const showQuestionsNudge = !showStreakNudge && shouldShowQuestionsMilestone(totalQuestionsAnswered);

  // Check for pending checkout on mount (safety net if onboarding didn't catch it)
  // ONLY redirect if pendingCheckout matches current course context
  useEffect(() => {
    const pendingCheckoutStr = localStorage.getItem('pendingCheckout');
    if (pendingCheckoutStr) {
      try {
        const pendingCheckout = JSON.parse(pendingCheckoutStr);
        // Only redirect if checkout is for the current course
        if (pendingCheckout.course === courseId) {
          localStorage.removeItem('pendingCheckout');
          logger.info('Home: Found pending checkout for current course, redirecting to checkout');
          navigate(`/start-checkout?course=${pendingCheckout.course}&interval=${pendingCheckout.interval}`);
        } else {
          // Clear stale checkout for different course
          localStorage.removeItem('pendingCheckout');
          logger.info(`Home: Cleared stale pendingCheckout for ${pendingCheckout.course}, current course is ${courseId}`);
        }
      } catch {
        localStorage.removeItem('pendingCheckout');
      }
    }
  }, [navigate, courseId]);

  // Get user info - properly typed now
  const firstName = userProfile?.displayName?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'there';
  
  // Use local state for section so we can update immediately
  // getCurrentSection returns course-appropriate section (not CPA 'FAR' for non-CPA courses)
  const initialSection = getCurrentSection(userProfile, courseId, getDefaultSection);
  const [activeSection, setActiveSection] = useState<string>(initialSection);
  
  // Lock body scroll when section picker is open
  useEffect(() => {
    if (showSectionPicker) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [showSectionPicker]);

  // Sync local state when profile loads/changes
  // Use getCurrentSection to ensure section is valid for current course
  useEffect(() => {
    if (userProfile?.examSection) {
      const validSection = getCurrentSection(userProfile, courseId, getDefaultSection);
      if (validSection !== activeSection) {
        setActiveSection(validSection);
      }
    }
  }, [userProfile?.examSection, courseId]);
  
  // Reset section when course changes (e.g., user switches from CISA to CPA)
  useEffect(() => {
    // Check if current section is valid for the new course using course config
    const validSections = course?.sections.map(s => s.id) || [];
    
    if (validSections.length > 0 && !validSections.includes(activeSection)) {
      // Reset to default if current section isn't valid for this course
      setActiveSection(getDefaultSection(courseId));
    }
  }, [courseId, course?.sections]);
  
  // Check if user has completed diagnostic quiz for current section
  useEffect(() => {
    const checkDiagnostic = async () => {
      if (!user?.uid) return;
      try {
        // Single-exam courses (CFP, CISA) use course ID as section key
        const singleExamCourses: CourseId[] = ['cfp', 'cisa'];
        const diagSection = singleExamCourses.includes(courseId) 
          ? courseId.toUpperCase() 
          : activeSection;
        const diagDocId = `${courseId}-${diagSection}`;
        const diagRef = doc(db, 'users', user.uid, 'diagnosticResults', diagDocId);
        const diagSnap = await getDoc(diagRef);
        setHasDiagnosticResult(diagSnap.exists());
      } catch (err) {
        logger.warn('Could not check diagnostic status:', err);
        setHasDiagnosticResult(null);
      }
    };
    checkDiagnostic();
  }, [user?.uid, courseId, activeSection]);
  
  // Get section info - course-aware via getSectionDisplayInfo
  const sectionInfo = getSectionDisplayInfo(activeSection, courseId);
  
  // Calculate days until exam - use getExamDate helper for multi-course support
  const examDate = getExamDate(userProfile, activeSection, courseId);
  const daysUntilExam = examDate ? differenceInDays(examDate, new Date()) : null;

  // Load readiness data - depends on activeSection (local state)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Find lessons for this section
        const lessons = await fetchAllLessons(courseId);
        const lessonProgress = userProfile?.lessonProgress || {};
        
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
  }, [activeSection, stats, courseId, userProfile?.lessonProgress]);

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
      // Derive courseId from section and sync both to Firebase + local state
      const derivedCourse = getCourseFromSection(newSection);
      
      // Persist examSection AND activeCourse to Firebase together
      await updateUserProfile({ examSection: newSection, activeCourse: derivedCourse } as any);
      
      // Also update CourseProvider's local state (saves to localStorage)
      if (derivedCourse !== courseId) {
        setCourse(derivedCourse);
      }
      
      // Refresh study stats for new section
      if (refreshStats) {
        await refreshStats();
      }
    } catch (error) {
      logger.error('Error changing section:', error);
      // Revert on error - use course-aware section
      setActiveSection(getCurrentSection(userProfile, courseId, getDefaultSection));
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-lg mx-auto space-y-6">
      {/* Section Picker Bottom Sheet */}
      <BottomSheet
        isOpen={showSectionPicker}
        onClose={() => setShowSectionPicker(false)}
        title="Change Exam Section"
        maxHeight={75}
      >
        <div className="py-1 space-y-1">
              {courseId === 'cpa' ? (
                // CPA-specific section picker with Core/Discipline grouping
                // Note: BEC was retired December 15, 2023, only BAR/ISC/TCP available
                (() => {                  
                  return (
                    <>
                      {/* Core Sections */}
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Core Sections (Required)</div>
                      {CORE_SECTIONS.map((sectionKey) => {
                        const section = getSectionDisplayInfo(sectionKey, courseId);
                        const isSelected = sectionKey === activeSection;
                        return (
                          <button
                            key={sectionKey}
                            onClick={() => handleSectionChange(sectionKey)}
                            disabled={changingSection}
                            className={clsx(
                              'w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                              isSelected
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                            )}
                          >
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                              style={{ backgroundColor: section?.color || '#6366f1' }}
                            >
                              {section?.shortName || sectionKey}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                                {section?.name || sectionKey}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {section?.description?.split('.')[0] || ''}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                      
                      {/* Discipline Sections - BAR, ISC, TCP only (BEC retired Dec 2023) */}
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mt-3 mb-2">
                        Discipline (Choose One)
                      </div>
                      {DISCIPLINE_SECTIONS_2026.map((sectionKey) => {
                        const section = getSectionDisplayInfo(sectionKey, courseId);
                        const isSelected = sectionKey === activeSection;
                        return (
                          <button
                            key={sectionKey}
                            onClick={() => handleSectionChange(sectionKey)}
                            disabled={changingSection}
                            className={clsx(
                              'w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                              isSelected
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                            )}
                          >
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                              style={{ backgroundColor: section?.color || '#6366f1' }}
                            >
                              {section?.shortName || sectionKey}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                                {section?.name || sectionKey}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {section?.description?.split('.')[0] || ''}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </>
                  );
                })()
              ) : (
                // Generic section picker for non-CPA courses
                <>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">
                    {course?.shortName || 'Exam'} Sections
                  </div>
                  {course?.sections.map((courseSection) => {
                    const section = getSectionDisplayInfo(courseSection.id, courseId);
                    const isSelected = courseSection.id === activeSection;
                    return (
                      <button
                        key={courseSection.id}
                        onClick={() => handleSectionChange(courseSection.id)}
                        disabled={changingSection}
                        className={clsx(
                          'w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                          isSelected
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                        )}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                          style={{ backgroundColor: section?.color || '#6366f1' }}
                        >
                          {courseSection.shortName}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                            {courseSection.name}
                          </div>
                          {courseSection.weight && (
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Weight: {courseSection.weight}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </>
              )}
        </div>
      </BottomSheet>

      {/* Header: Greeting + Stats Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm italic">
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
              className="px-2 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
            >
              {sectionInfo?.shortName || activeSection}
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
              {sectionInfo?.name || activeSection}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
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
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{daysUntilExam}d</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exam Date Prompt - Show when no exam date set for this course */}
      {!examDate && (
        <Link
          to="/settings?tab=study"
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-700 rounded-xl hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              When is your {course?.shortName || courseId?.toUpperCase() || 'exam'} exam?
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Set your exam date for personalized study pacing
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-primary-500" />
        </Link>
      )}

      {/* Diagnostic Quiz Prompt - Show when user hasn't taken the diagnostic yet */}
      {hasDiagnosticResult === false && (
        <Link
          to="/diagnostic"
          state={{ section: userProfile?.examSection || '' }}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
            <ClipboardCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              Take Your Diagnostic Quiz
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              25 questions to identify your strengths and weak areas
            </div>
          </div>
          <Brain className="w-5 h-5 text-indigo-500" />
        </Link>
      )}

      {/* Today's Personalized Plan - This IS the primary CTA now */}
      <DailyPlanCard compact />

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          to={activeSection ? `/learn?section=${activeSection}` : '/learn'}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Lessons</span>
        </Link>
        
        <Link
          to={getCoursePracticePath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Questions</span>
        </Link>
        
        {course?.hasTBS && (
        <Link
          to={getCourseTBSPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">TBS</span>
        </Link>
        )}
        
        {/* CMA Essay/CBQ button - Essays are 25% of CMA exam */}
        {/* Note: Essays available until Aug 2026, CBQs mandatory from Sept 2026 */}
        {courseId === 'cma' && (
        <>
        <Link
          to={getCourseEssayPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Essays</span>
        </Link>
        <Link
          to={getCourseCBQPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all hover:shadow-md relative"
        >
          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">NEW</span>
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CBQ</span>
        </Link>
        </>
        )}
      </div>

      {/* More Ways to Study - Action buttons above stats */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-1">More Ways to Study</p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={getCourseFlashcardPath(courseId)}
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors"
          >
            <Brain className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Flashcards</span>
          </Link>
          
          <Link
            to={getCourseQuizPath(courseId)}
            className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Timed Quiz</span>
          </Link>

          <Link
            to={getCourseExamPath(courseId)}
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

      {/* Share Nudge - contextual, non-intrusive */}
      {showStreakNudge && (
        <ShareNudge trigger="streak_milestone" streak={currentStreak} />
      )}
      {showQuestionsNudge && (
        <ShareNudge trigger="questions_milestone" totalQuestions={totalQuestionsAnswered} />
      )}
      {showDashboardNudge && !showStreakNudge && !showQuestionsNudge && (
        <ShareNudge trigger="dashboard_periodic" />
      )}

      {/* Study Time Card - At bottom since less actionable */}
      <StudyTimeCard />
      </div>
    </div>
  );
};

export default Home;
