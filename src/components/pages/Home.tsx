import { useState, useEffect, useRef } from 'react';
import { useSEO } from '../../hooks/useSEO';
import logger from '../../utils/logger';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
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
  AlertTriangle,
  Check,
  ClipboardCheck,
  Rocket,
  ArrowRight,
  X as XIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CORE_SECTIONS, DISCIPLINE_SECTIONS_2026 } from '../../config/examConfig';
import { getSectionDisplayInfo, getDefaultSection } from '../../utils/sectionUtils';
import { getExamDate, getCurrentSection } from '../../utils/profileHelpers';
import { differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { calculateExamReadiness, ReadinessData, getStatusText, getStatusColor } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';
import { getTopicsForSection } from '../../services/questionService';
import { getSectionContent } from '../../services/contentRegistry';
import { 
  getCoursePracticePath, 
  getCourseFlashcardPath, 
  getCourseExamPath,
  getCourseTBSPath,
  getCourseEssayPath,
  getCourseCaseStudyPath,
} from '../../utils/courseNavigation';
import { CourseId } from '../../types/course';
import DailyPlanCard from '../DailyPlanCard';
import { StudyPlanCTA } from '../StudyPlanCTA';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { BottomSheet } from '../common/BottomSheet';
import { ShareNudge, useDashboardShareNudge, shouldShowStreakNudge, shouldShowQuestionsMilestone } from '../common/ShareNudge';
import { useToast } from '../common/Toast';
import { useSubscription } from '../../services/subscription';

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
  // Prevent search engines from indexing the authenticated dashboard
  useSEO({ title: 'Dashboard', noindex: true });
  
  const navigate = useNavigate();
  const { user, userProfile, updateUserProfile } = useAuth();
  const { currentStreak, stats, weeklyStats, refreshStats, getTopicPerformance, getLessonProgress, todayLog, dailyProgress, sectionEarnedPoints } = useStudy();
  const { courseId, course, setCourse } = useCourse();
  const { hasPlan, loading: planLoading, daysUntilExam: planDaysUntilExam } = useStudyPlan();
  const { isTrialing, trialDaysRemaining, isPremium } = useSubscription();
  const [welcomeDismissed, setWelcomeDismissed] = useState(() =>
    localStorage.getItem('voraprep_welcome_dismissed') === '1'
  );
  const [studyPlanNudgeDismissed, setStudyPlanNudgeDismissed] = useState(() =>
    localStorage.getItem('voraprep_studyplan_nudge_dismissed') === '1'
  );
  
  // Track "has practiced" in localStorage for instant hydration (no flash for returning users)
  const [hasEverPracticedLocal, setHasEverPracticedLocal] = useState(() =>
    localStorage.getItem('voraprep_has_practiced') === '1'
  );
  
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null);
  const [weakAreas, setWeakAreas] = useState<{ topic: string; accuracy: number; questions: number }[]>([]);
  const [_loading, setLoading] = useState(true);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [changingSection, setChangingSection] = useState(false);
  const [_hasDiagnosticResult, setHasDiagnosticResult] = useState<boolean | null>(null);
  const showDashboardNudge = useDashboardShareNudge();
  
  // Feature discovery state
  const [featureNudgeDismissed, setFeatureNudgeDismissed] = useState(() =>
    localStorage.getItem('voraprep_feature_nudge_dismissed') === '1'
  );
  const [featureUsage, setFeatureUsage] = useState({
    hasFlashcards: false,
    hasSimulation: false,
    hasLessons: false,
  });

  // Check for milestone-based share nudges
  // Use section-specific stats for milestones, but weeklyStats for "has user ever practiced" check
  const totalQuestionsAnswered = stats?.totalQuestions || 0;
  // Also check todayLog for immediate feedback (stats refetch is delayed)
  const hasTodayActivity = (todayLog?.questionsAnswered || 0) > 0 || (todayLog?.earnedPoints || 0) > 0;
  const hasEverPracticed = (stats !== null && (totalQuestionsAnswered > 0 || weeklyStats.totalQuestions > 0)) || hasTodayActivity;
  const showStreakNudge = shouldShowStreakNudge(currentStreak);
  const showQuestionsNudge = !showStreakNudge && shouldShowQuestionsMilestone(totalQuestionsAnswered);

  // Sync "has practiced" to localStorage when Firestore confirms it (for instant hydration on next visit)
  useEffect(() => {
    if (hasEverPracticed && !hasEverPracticedLocal) {
      localStorage.setItem('voraprep_has_practiced', '1');
      setHasEverPracticedLocal(true);
    }
  }, [hasEverPracticed, hasEverPracticedLocal]);

  // Combined check: use localStorage first (instant), fall back to Firestore check
  // This ensures: new users see Welcome Card immediately, returning users don't see a flash
  const hasUserEverPracticed = hasEverPracticedLocal || hasEverPracticed;

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
  
  // Keep a ref to track activeSection for effect comparisons (avoids stale closure issues)
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);
  
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
  // Use ref for comparison to avoid stale closure issues
  useEffect(() => {
    const storedSection = userProfile?.examSection;
    if (storedSection) {
      const validSection = getCurrentSection(userProfile, courseId, getDefaultSection);
      // Use ref to get current value (not stale closure)
      if (validSection !== activeSectionRef.current) {
        logger.info(`[Section] Syncing from profile: ${storedSection} -> ${validSection} (was ${activeSectionRef.current})`);
        setActiveSection(validSection);
      }
    }
  }, [userProfile?.examSection, courseId]);
  
  // Reset section when course changes (e.g., user switches from CISA to CPA)
  useEffect(() => {
    // Check if current section is valid for the new course using course config
    const validSections = course?.sections.map(s => s.id) || [];
    
    // Use ref to get current value (not stale closure)
    if (validSections.length > 0 && !validSections.includes(activeSectionRef.current)) {
      // Reset to default if current section isn't valid for this course
      logger.info(`[Section] Resetting invalid section ${activeSectionRef.current} for course ${courseId} to default`);
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
  
  // Single-exam courses (CISA, CFP) don't need a section picker
  const SINGLE_EXAM_COURSES = ['cisa', 'cfp'];
  const isSingleExamCourse = SINGLE_EXAM_COURSES.includes(courseId);
  
  // Calculate days until exam — prefer study plan date (source of truth), fall back to profile
  const profileExamDate = getExamDate(userProfile, activeSection, courseId);
  const profileDaysUntilExam = profileExamDate ? differenceInDays(profileExamDate, new Date()) : null;
  const daysUntilExam = planDaysUntilExam ?? profileDaysUntilExam;

  // Load readiness data - depends on activeSection (local state)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Find lessons for this section
        const lessons = await fetchAllLessons(courseId);
        // Read lesson completion from Firestore lessons subcollection (where completeLesson writes)
        const lessonProgress = await getLessonProgress();
        
        // Filter lessons by section
        const sectionLessons = lessons.filter(l => l.section === activeSection);
        const completedCount = sectionLessons.filter(l => lessonProgress[l.id]?.status === 'completed').length;

        // Fetch topic performance for readiness calc + weak areas display
        const topicPerformance = await getTopicPerformance(activeSection);
        // Get total available topics for accurate coverage calculation
        const allTopics = await getTopicsForSection(activeSection as any);
        const sectionContent = getSectionContent(activeSection);
        const readiness = calculateExamReadiness(
          stats || { totalQuestions: 0, accuracy: 0 },
          topicPerformance,
          completedCount,
          sectionLessons.length,
          0,
          sectionContent?.counts.tbs ?? 20,
          { 
            totalTopics: allTopics.length || 30,
            volumeTarget: sectionContent?.counts.mcqs ?? 500,
            totalTbsOverride: sectionContent?.counts.tbs ?? 20,
          }
        );
        setReadinessData(readiness);
        
        // Identify weak areas: topics with 5+ attempts and <60% accuracy
        const weak = topicPerformance
          .filter(t => t.questions >= 5 && t.accuracy < 60)
          .sort((a, b) => a.accuracy - b.accuracy)
          .slice(0, 3);
        setWeakAreas(weak);
      } catch (error) {
        logger.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeSection, stats, courseId]);

  // Track feature usage for discovery nudges
  useEffect(() => {
    const checkFeatureUsage = async () => {
      if (!user?.uid) return;
      try {
        const dailyLogRef = collection(db, 'users', user.uid, 'daily_log');
        const logsSnap = await getDocs(dailyLogRef);
        
        let hasFlashcards = false;
        let hasSimulation = false;
        let hasLessons = false;
        
        logsSnap.forEach(logDoc => {
          const data = logDoc.data();
          if (data.lessonsCompleted && data.lessonsCompleted > 0) hasLessons = true;
          if (data.simulationsCompleted && data.simulationsCompleted > 0) hasSimulation = true;
          if (data.activities && Array.isArray(data.activities)) {
            if (data.activities.some((a: { type: string }) => a.type === 'flashcard')) hasFlashcards = true;
          }
        });
        
        setFeatureUsage({ hasFlashcards, hasSimulation, hasLessons });
      } catch (err) {
        logger.warn('Could not check feature usage:', err);
      }
    };
    checkFeatureUsage();
  }, [user?.uid]);

  // Handle section change - update local state immediately, then persist
  const toast = useToast();
  
  const handleSectionChange = async (newSection: string) => {
    if (newSection === activeSection) {
      setShowSectionPicker(false);
      return;
    }
    
    const previousSection = activeSection;
    logger.info(`[Section] Changing section from ${previousSection} to ${newSection}`);
    
    // Update local state immediately for instant UI update
    setActiveSection(newSection);
    setShowSectionPicker(false);
    setChangingSection(true);
    
    try {
      // Derive courseId from section and sync both to Firebase + local state
      const derivedCourse = getCourseFromSection(newSection);
      
      // Persist examSection AND activeCourse to Firebase together
      logger.info(`[Section] Persisting examSection=${newSection}, activeCourse=${derivedCourse} to Firebase`);
      await updateUserProfile({ examSection: newSection, activeCourse: derivedCourse } as any);
      logger.info(`[Section] Firebase update successful`);
      
      // Also update CourseProvider's local state (saves to localStorage)
      if (derivedCourse !== courseId) {
        setCourse(derivedCourse);
      }
      
      // Refresh study stats for new section
      if (refreshStats) {
        await refreshStats();
      }
    } catch (error) {
      logger.error('[Section] Error changing section:', error);
      // Revert on error - use course-aware section
      setActiveSection(previousSection);
      toast.error('Failed to save section change. Please try again.');
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
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
      <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
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
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm italic">
              "{tutorMessage}"
            </p>
          </div>
        </div>
        
        {/* Section Selector + Stats Row */}
        <div className="flex items-center justify-between">
          {/* Section Badge - for single-exam courses just show course name, for others show picker */}
          {isSingleExamCourse ? (
            // Single-exam courses: static badge showing course name
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <div 
                className="px-2 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
              >
                {courseId.toUpperCase()}
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                {course?.shortName || `${courseId.toUpperCase()} Exam`}
              </span>
            </div>
          ) : (
            // Multi-section courses: tappable section selector
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
          )}

          {/* Right side stats - streak hidden on mobile (shown in header), days until exam */}
          <div className="flex items-center gap-3">
            <div 
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 dark:bg-orange-900/30 rounded-lg"
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

      {/* Daily Goal Progress */}
      {todayLog && totalQuestionsAnswered > 0 && (
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Today's Goal</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {sectionEarnedPoints}/{todayLog.goalPoints} pts
              </span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full rounded-full transition-all duration-500',
                  dailyProgress >= 100 ? 'bg-emerald-500' : dailyProgress >= 50 ? 'bg-primary-500' : 'bg-amber-500'
                )}
                style={{ width: `${Math.min(100, dailyProgress)}%` }}
              />
            </div>
          </div>
          {dailyProgress >= 100 && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">✓ Done!</span>
          )}
        </div>
      )}

      {/* Welcome Card or "What's Next" choices */}
      {/* Show Welcome Card immediately for new users (no waiting for stats) */}
      {!welcomeDismissed && !hasUserEverPracticed ? (
        <div className="relative bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 rounded-2xl border border-primary-200 dark:border-primary-800 p-5">
          <button
            onClick={() => {
              setWelcomeDismissed(true);
              localStorage.setItem('voraprep_welcome_dismissed', '1');
            }}
            className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Dismiss welcome card"
          >
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Welcome to VoraPrep!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {isTrialing
                  ? `Your 14-day free trial is active — ${trialDaysRemaining} days of unlimited access to all ${course?.shortName || courseId.toUpperCase()} content.`
                  : isPremium
                    ? `You have full access to all ${course?.shortName || courseId.toUpperCase()} content.`
                    : `Start exploring ${course?.shortName || courseId.toUpperCase()} study materials.`}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Choose your study style:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Link
                  to={activeSection ? `/learn?section=${activeSection}` : '/learn'}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Start with Lessons
                </Link>
                <Link
                  to={getCoursePracticePath(courseId)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <Target className="w-4 h-4" />
                  Jump to Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !hasPlan && !planLoading && !studyPlanNudgeDismissed && (
          hasUserEverPracticed ? (
            // Returning user without study plan - show "Continue Studying" prompt
            <div className="relative bg-gradient-to-r from-emerald-50 to-primary-50 dark:from-emerald-900/20 dark:to-primary-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 p-4">
              <button
                onClick={() => {
                  setStudyPlanNudgeDismissed(true);
                  localStorage.setItem('voraprep_studyplan_nudge_dismissed', '1');
                }}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
                aria-label="Dismiss"
              >
                <XIcon className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Ready to continue?
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Pick up where you left off
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <Link
                      to={activeSection ? `/learn?section=${activeSection}` : '/learn'}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Continue Lessons
                    </Link>
                    <Link
                      to={getCoursePracticePath(courseId)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      <Target className="w-4 h-4" />
                      Practice Questions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // New user without practice - show "What would you like to do?" card
            <div className="relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <button
                onClick={() => {
                  setStudyPlanNudgeDismissed(true);
                  localStorage.setItem('voraprep_studyplan_nudge_dismissed', '1');
                }}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Dismiss"
              >
                <XIcon className="w-4 h-4" />
              </button>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                What would you like to do?
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    setStudyPlanNudgeDismissed(true);
                    localStorage.setItem('voraprep_studyplan_nudge_dismissed', '1');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <Rocket className="w-4 h-4" />
                  Start Exploring
                </button>
                <Link
                  to="/study-plan/setup"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Create a Study Plan
                </Link>
              </div>
            </div>
          )
        )
      )}

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
        
        <Link
          to={getCourseFlashcardPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-colors hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Flashcards</span>
        </Link>

        {course?.hasTBS ? (
        <Link
          to={getCourseTBSPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">TBS</span>
        </Link>
        ) : courseId === 'cma' ? (
        <Link
          to={getCourseEssayPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Essays</span>
        </Link>
        ) : courseId === 'cfp' ? (
        <Link
          to={getCourseCaseStudyPath(courseId)}
          className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Case Studies</span>
        </Link>
        ) : (
          <Link
            to={getCourseExamPath(courseId)}
            className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Mock Exam</span>
          </Link>
        )}
      </div>

      {/* Feature Discovery Nudge - shows when user has practiced but hasn't tried other features */}
      {!featureNudgeDismissed && hasEverPracticed && totalQuestionsAnswered >= 10 && (
        (!featureUsage.hasFlashcards || !featureUsage.hasSimulation || !featureUsage.hasLessons) && (
          <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-4">
            <button
              onClick={() => {
                setFeatureNudgeDismissed(true);
                localStorage.setItem('voraprep_feature_nudge_dismissed', '1');
              }}
              className="absolute top-2 right-2 p-1 text-amber-400 hover:text-amber-600 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-colors"
              aria-label="Dismiss"
            >
              <XIcon className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                  Try something new!
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  {!featureUsage.hasLessons
                    ? "Lessons explain concepts before you practice. Great for building foundations."
                    : !featureUsage.hasFlashcards
                    ? "Flashcards help you memorize key terms and concepts faster."
                    : "Mock exams simulate the real test environment. See if you're ready!"
                  }
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {!featureUsage.hasLessons && (
                    <Link
                      to={activeSection ? `/learn?section=${activeSection}` : '/learn'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Try Lessons
                    </Link>
                  )}
                  {!featureUsage.hasFlashcards && (
                    <Link
                      to={getCourseFlashcardPath(courseId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      Try Flashcards
                    </Link>
                  )}
                  {!featureUsage.hasSimulation && (
                    <Link
                      to={getCourseExamPath(courseId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <Target className="w-3.5 h-3.5" />
                      Try Mock Exam
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Readiness Score + Weak Areas */}
      {/* Only show if there's actual study data (volume > 0 means questions/TBS attempted) */}
      {readinessData && readinessData.breakdown.volume > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={clsx(
                'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold',
                readinessData.status === 'ready' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : readinessData.status === 'almost' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
              )}>
                {readinessData.overall}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Exam Readiness
                </div>
                <div className={clsx('text-xs font-medium', getStatusColor(readinessData.status))}>
                  {getStatusText(readinessData.status)}
                </div>
              </div>
            </div>
            <Link
              to="/progress"
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              Details →
            </Link>
          </div>
          
          {/* Readiness breakdown bars */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {[
              { label: 'Accuracy', value: readinessData.breakdown.accuracy },
              { label: 'MCQ Coverage', value: readinessData.breakdown.coverage },
              { label: 'Questions', value: readinessData.breakdown.volume },
              { label: 'Lessons', value: readinessData.breakdown.lessons },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400 w-20">{item.label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'h-full rounded-full transition-all',
                      item.value >= 80 ? 'bg-emerald-500' : item.value >= 50 ? 'bg-amber-500' : 'bg-primary-500'
                    )}
                    style={{ width: `${Math.min(100, item.value)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Focus Areas</span>
              </div>
              <div className="space-y-1.5">
                {weakAreas.map(area => (
                  <div key={area.topic} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 truncate mr-2">{area.topic}</span>
                    <span className={clsx(
                      'font-medium tabular-nums flex-shrink-0',
                      area.accuracy < 40 ? 'text-red-500' : 'text-amber-600 dark:text-amber-400'
                    )}>
                      {area.accuracy}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Today's Plan */}
      {!planLoading && hasPlan && <DailyPlanCard compact />}

      {/* Compact Study Plan CTA at bottom for users who dismissed the top card */}
      {!planLoading && !hasPlan && studyPlanNudgeDismissed && (
        <StudyPlanCTA compact />
      )}

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


      </div>
    </div>
  );
};

export default Home;
