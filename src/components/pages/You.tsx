import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FEATURES } from '../../config/featureFlags';
import {
  Settings,
  ChevronRight,
  Flame,
  Calendar,
  BarChart3,
  Trophy,
  LogOut,
  Camera,
  HelpCircle,
  Users,
  CreditCard,
  Clock,
  Sparkles,
  ExternalLink,
  Play,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { getSectionDisplayInfo, getDefaultSection } from '../../utils/sectionUtils';
import { getExamDate, getCurrentSection, createExamDateUpdate } from '../../utils/profileHelpers';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { format, eachDayOfInterval, differenceInDays, startOfWeek, endOfWeek, isAfter } from 'date-fns';
import clsx from 'clsx';
import { calculateExamReadiness, ReadinessData } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useSubscription, EXAM_PRICING, isFounderPricingActive } from '../../services/subscription';
import { isCourseActive } from '../../courses';
import { CourseId } from '../../types/course';
import logger from '../../utils/logger';

// Readiness Ring Component
const ReadinessRing = ({ readiness, size = 100 }: { readiness: number; size?: number }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (readiness / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-slate-100 dark:text-slate-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={clsx(
            'transition-all duration-1000 ease-out',
            readiness >= 75 ? 'text-success-500' : readiness >= 50 ? 'text-warning-500' : 'text-primary-500'
          )}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {Math.round(readiness)}%
        </span>
        <span className="text-xs text-slate-600 dark:text-slate-400">Ready</span>
      </div>
    </div>
  );
};

// Weekly Activity Chart
const WeeklyChart = ({ activity }: { activity: { date: Date; questions: number; lessons: number }[] }) => {
  const maxActivity = Math.max(...activity.map(d => d.questions + d.lessons), 1);
  
  return (
    <div className="flex items-end justify-between gap-1 h-16">
      {activity.map((day, i) => {
        const totalActivity = day.questions + day.lessons;
        const isActive = totalActivity > 0;
        const height = Math.max((totalActivity / maxActivity) * 100, isActive ? 20 : 10);
        
        return (
          <div key={i} className="flex-1 flex flex-col items-center h-full">
            {/* Bar wrapper needs h-full for percentage heights to work */}
            <div className="flex-1 w-full flex items-end">
              <div 
                className={clsx(
                  'w-full rounded-t transition-all',
                  isActive ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'
                )}
                style={{ height: `${height}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">
              {format(day.date, 'EEE').charAt(0)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const You: React.FC = () => {
  const { user, userProfile, updateUserProfile, signOut } = useAuth();
  const { currentStreak, getTopicPerformance, getLessonProgress } = useStudy();
  const { courseId, course } = useCourse();
  const { getExamAccess, isPremium } = useSubscription();
  
  // Single-exam courses should aggregate ALL domains/sections (one exam = one set of stats)
  const singleExamCourses = ['cisa', 'cfp', 'cia'];
  const isSingleExamCourse = singleExamCourses.includes(courseId || '');
  
  // Initialize with current week's dates (Mon-Sun) for consistent chart rendering
  const getInitialWeeklyActivity = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const end = endOfWeek(new Date(), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end }).map(date => ({ date, questions: 0, lessons: 0 }));
  };
  
  const [weeklyActivity, setWeeklyActivity] = useState<{ date: Date; questions: number; lessons: number }[]>(getInitialWeeklyActivity);
  const [overallStats, setOverallStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    tbsCompleted: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    studyMinutes: 0,
    accuracy: 0,
  });
  const [_topicPerformance, setTopicPerformance] = useState<{ id: string; topic: string; accuracy: number; questions: number }[]>([]);
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSavingExamDate, setIsSavingExamDate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [_loading, setLoading] = useState(true);

  // Get user info - properly typed
  const displayName = userProfile?.displayName || 'User';
  const firstName = displayName.split(' ')[0];
  // Get exam section appropriate for current course (not just stored CPA section)
  const examSection = getCurrentSection(userProfile, courseId, getDefaultSection);
  const sectionInfo = getSectionDisplayInfo(examSection, courseId);
  
  // Calculate days until exam - use getExamDate helper for multi-course support
  const examDate = getExamDate(userProfile, examSection, courseId);
  const daysUntilExam = examDate ? differenceInDays(examDate, new Date()) : null;

  // Handle inline exam date save
  const handleExamDateChange = async (dateStr: string) => {
    if (!dateStr) return;
    setIsSavingExamDate(true);
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const localDate = new Date(year, month - 1, day);
      if (isNaN(localDate.getTime())) return;
      const examDateUpdate = createExamDateUpdate(userProfile, examSection, localDate, courseId);
      await updateUserProfile(examDateUpdate);
      logger.info('Exam date saved from You page:', { courseId, date: dateStr });
    } catch (err) {
      logger.error('Failed to save exam date:', err);
    } finally {
      setIsSavingExamDate(false);
    }
  };

  // Load data
  useEffect(() => {
    if (!user?.uid) return;

    const loadData = async () => {
      setLoading(true);
      try {
        // Get weekly activity (Current Week: Mon-Sun)
        const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
        const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); // Sunday
        
        const days = eachDayOfInterval({
          start: startOfCurrentWeek,
          end: endOfCurrentWeek,
        });

        // Track section-specific stats
        let sectionQuestions = 0;
        let sectionCorrect = 0;
        let sectionTbs = 0;
        let sectionMinutes = 0;

        const dailyData = await Promise.all(
          days.map(async (date) => {
            // Don't query future dates
            if (isAfter(date, new Date())) {
              return { date, questions: 0, lessons: 0 };
            }

            const dateKey = format(date, 'yyyy-MM-dd');
            // Use course-specific daily log ID
            const dailyLogId = `${courseId}_${dateKey}`;
            const logRef = doc(db, 'users', user.uid, 'daily_log', dailyLogId);
            const logSnap = await getDoc(logRef);

            if (logSnap.exists()) {
              const data = logSnap.data();
              
              // Filter activities by section(s) for stats
              // For single-exam courses (CISA, CFP, CIA), include ALL sections for aggregate stats
              const activities = data.activities || [];
              const sectionActivities = activities.filter(
                (a: { section?: string; type?: string; courseId?: string }) => {
                  // For single-exam courses, match by courseId or section prefix
                  if (isSingleExamCourse) {
                    return a.courseId === courseId || 
                           (a.section && a.section.toUpperCase().startsWith(courseId?.toUpperCase() || '')) ||
                           // Include legacy activities without section
                           (!a.section && a.type === 'mcq');
                  }
                  // For multi-exam courses (CPA, CMA, EA), filter by exact section
                  return a.section === examSection || 
                         // Include legacy activities without section (before this update)
                         (!a.section && a.type === 'mcq');
                }
              );
              
              // Count section-specific MCQs
              const mcqActivities = sectionActivities.filter((a: { type?: string }) => a.type === 'mcq');
              const correctMcqs = mcqActivities.filter((a: { isCorrect?: boolean }) => a.isCorrect).length;
              
              // Count section-specific TBS
              const tbsActivities = sectionActivities.filter((a: { type?: string }) => a.type === 'tbs');
              
              sectionQuestions += mcqActivities.length;
              sectionCorrect += correctMcqs;
              sectionTbs += tbsActivities.length;
              
              // Estimate time per activity (activities store timeSpentSeconds for MCQs, timeSpent (mins) for others)
              const sectionTime = sectionActivities.reduce(
                (sum: number, a: { timeSpentSeconds?: number; timeSpent?: number }) => {
                  if (a.timeSpentSeconds) {
                    return sum + (a.timeSpentSeconds / 60);
                  } else if (a.timeSpent) {
                    return sum + a.timeSpent;
                  }
                  return sum;
                }, 
                0
              );
              sectionMinutes += sectionTime;

              // Count section-specific lessons
              const lessonActivities = sectionActivities.filter((a: { type?: string }) => a.type === 'lesson');

              return {
                date,
                questions: mcqActivities.length,
                lessons: lessonActivities.length,
              };
            }
            return { date, questions: 0, lessons: 0 };
          })
        );
        
        setWeeklyActivity(dailyData);

        // Get topic performance (section-filtered, or all sections for single-exam courses)
        let topicsData: { id: string; topic: string; accuracy: number; questions: number }[] = [];
        if (getTopicPerformance) {
          // For single-exam courses, pass undefined to get all sections
          topicsData = await getTopicPerformance(isSingleExamCourse ? undefined : examSection);
        }
        setTopicPerformance(topicsData);

        // Get lesson progress for section (or all sections for single-exam courses)
        let lessonsCompletedCount = 0;
        if (getLessonProgress) {
          const lessonProgress = await getLessonProgress();
          lessonsCompletedCount = Object.values(lessonProgress).filter(
            (lesson: any) => {
              // Check completion: either status === 'completed' OR progress >= 100
              const isCompleted = lesson.status === 'completed' || lesson.progress >= 100;
              if (!isCompleted) return false;
              
              // For single-exam courses, count all sections (they're all for one exam)
              if (isSingleExamCourse) {
                return lesson.courseId === courseId || 
                       (lesson.section && lesson.section.toUpperCase().startsWith(courseId?.toUpperCase() || ''));
              }
              // For multi-exam courses, filter by specific section
              return lesson.section === examSection;
            }
          ).length;
        }

        // Get total lessons for section (or all sections for single-exam courses)
        const allLessons = await fetchAllLessons(courseId);
        const sectionLessons = isSingleExamCourse 
          ? allLessons // All lessons count for single-exam courses
          : allLessons.filter(l => l.section === examSection);
        const totalLessonsCount = sectionLessons.length;

        setOverallStats({
          totalQuestions: sectionQuestions,
          correctAnswers: sectionCorrect,
          tbsCompleted: sectionTbs,
          lessonsCompleted: lessonsCompletedCount,
          totalLessons: totalLessonsCount,
          studyMinutes: Math.round(sectionMinutes),
          accuracy: sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0,
        });

        // Calculate readiness with proper parameters including TBS
        const readiness = calculateExamReadiness(
          { totalQuestions: sectionQuestions, accuracy: sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0 },
          topicsData,
          lessonsCompletedCount,
          totalLessonsCount,
          sectionTbs,
          20
        );
        setReadinessData(readiness);

      } catch (error) {
        logger.error('Error loading you page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.uid, examSection, courseId, getTopicPerformance, getLessonProgress]);

  // Handle photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.uid) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `users/${user.uid}/profile.${file.name.split('.').pop()}`);
      await uploadBytes(storageRef, file);
      // Photo uploaded - profile will refresh from storage
      await getDownloadURL(storageRef);
    } catch (error) {
      logger.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  const weeklyQuestions = weeklyActivity.reduce((sum, d) => sum + d.questions, 0);
  const weeklyLessons = weeklyActivity.reduce((sum, d) => sum + d.lessons, 0);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
      <div className="max-w-lg mx-auto space-y-4 sm:space-y-6 pb-8">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center overflow-hidden">
              {userProfile?.photoURL ? (
                <img src={userProfile.photoURL} alt="Your profile photo" className="w-20 h-20 rounded-full object-cover" loading="lazy" />
              ) : (
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {firstName?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              loading={isUploadingPhoto}
              className="absolute -bottom-1 -right-1 !w-8 !h-8 !min-w-0 !min-h-0 !p-0 rounded-full bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center justify-center"
              aria-label="Upload profile photo"
            >
              {!isUploadingPhoto && <Camera className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
            </Button>
          </div>

          {/* Name & Section */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{displayName}</h1>
            <p className="text-slate-600 dark:text-slate-300">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span 
                className="px-2 py-0.5 text-xs font-semibold rounded-full text-white"
                style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
              >
                {sectionInfo?.shortName || examSection}
              </span>
              {daysUntilExam !== null && daysUntilExam > 0 && (
                <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {daysUntilExam} days left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Exam Date - inline editor */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Exam Date</span>
            </div>
            {isSavingExamDate && (
              <span className="text-xs text-primary-500">Saving...</span>
            )}
          </div>
          <div className="mt-2">
            <input
              type="date"
              value={examDate ? format(examDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleExamDateChange(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:[color-scheme:dark]"
            />
          </div>
        </div>

        {/* Quick Stats - 2 rows showing key metrics */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
          {/* Row 1: Streak, MCQs, TBS (or Accuracy if no TBS) */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-bold text-lg">{currentStreak}</span>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Streak</span>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{overallStats.totalQuestions}</div>
            <span className="text-xs text-slate-600 dark:text-slate-400">MCQs</span>
          </div>
          {course?.hasTBS ? (
            <div className="text-center">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{overallStats.tbsCompleted}</div>
              <span className="text-xs text-slate-600 dark:text-slate-400">TBS</span>
            </div>
          ) : (
            <div className="text-center">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{overallStats.accuracy}%</div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Accuracy</span>
            </div>
          )}
          
          {/* Row 2: Lessons, Accuracy (or Time if no TBS), Time */}
          <div className="text-center">
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {overallStats.lessonsCompleted}/{overallStats.totalLessons}
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Lessons</span>
          </div>
          {course?.hasTBS ? (
            <div className="text-center">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{overallStats.accuracy}%</div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Accuracy</span>
            </div>
          ) : (
            <div className="text-center">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                {overallStats.studyMinutes < 60 
                  ? `${overallStats.studyMinutes}m` 
                  : `${(overallStats.studyMinutes / 60).toFixed(1)}h`}
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Time</span>
            </div>
          )}
          {course?.hasTBS ? (
            <div className="text-center">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                {overallStats.studyMinutes < 60 
                  ? `${overallStats.studyMinutes}m` 
                  : `${(overallStats.studyMinutes / 60).toFixed(1)}h`}
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Time</span>
            </div>
          ) : (
            <div className="text-center">
              <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
                {daysUntilExam !== null && daysUntilExam > 0 ? daysUntilExam : '—'}
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Days Left</span>
            </div>
          )}
        </div>
      </Card>

      {/* Readiness & Weekly Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Readiness */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">Exam Ready</h3>
          <div className="flex justify-center">
            <ReadinessRing readiness={readinessData?.overall || 0} size={80} />
          </div>
        </Card>

        {/* This Week */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">This Week</h3>
            <span className="text-xs text-primary-600 font-medium">
              {weeklyQuestions > 0 && `${weeklyQuestions} Q`}
              {weeklyQuestions > 0 && weeklyLessons > 0 && ' · '}
              {weeklyLessons > 0 && `${weeklyLessons} L`}
              {weeklyQuestions === 0 && weeklyLessons === 0 && '0'}
            </span>
          </div>
          <WeeklyChart activity={weeklyActivity} />
        </Card>
      </div>

      {/* Subscription & Trials */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Subscription & Trials
          </h3>
          {isPremium && (
            <Link
              to="/settings"
              className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Manage <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>

        <div className="space-y-2">
          {(['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'] as CourseId[]).filter(id => isCourseActive(id)).map(examId => {
            const access = getExamAccess(examId);
            const examName = examId.toUpperCase();
            const pricing = EXAM_PRICING[examId];
            const isFounder = isFounderPricingActive();

            // Skip exams user has never interacted with
            if (!access.hasAccess && !access.trialExpired && access.canStartTrial && examId !== courseId) {
              return null;
            }

            return (
              <div
                key={examId}
                className={clsx(
                  'flex items-center justify-between p-3 rounded-lg border transition-colors',
                  examId === courseId
                    ? 'border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10'
                    : 'border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-10">{examName}</span>
                  <div>
                    {access.isPaid ? (
                      <>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${access.cancelAtPeriodEnd ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                          <CheckCircle className="w-3.5 h-3.5" />
                          {access.cancelAtPeriodEnd
                            ? `Cancels${access.currentPeriodEnd ? ` on ${new Date(access.currentPeriodEnd).toLocaleDateString()}` : ''}`
                            : 'Subscribed'
                          }
                        </span>
                        {!access.cancelAtPeriodEnd && access.currentPeriodEnd && (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Through {new Date(access.currentPeriodEnd).toLocaleDateString()}
                          </span>
                        )}
                      </>
                    ) : access.isTrialing ? (
                      <>
                        <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                          <Clock className="w-3.5 h-3.5" />
                          Trial: {access.trialDaysRemaining} days remaining
                        </span>
                        {access.trialEndDate && (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Ends {access.trialEndDate.toLocaleDateString()}
                          </span>
                        )}
                      </>
                    ) : access.trialExpired ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-red-500 dark:text-red-400">
                        <Clock className="w-3.5 h-3.5" />
                        Trial expired
                      </span>
                    ) : access.canStartTrial ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <Play className="w-3.5 h-3.5" />
                        14-day free trial available
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Action button — show subscribe for trialing, expired, or no-trial users */}
                {!access.isPaid && !access.canStartTrial && (
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/start-checkout?course=${examId}&interval=annual`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-1"
                    >
                      {isFounder && <Sparkles className="w-3 h-3" />}
                      ${isFounder ? pricing.founderAnnual : pricing.annual}/yr
                    </Link>
                    <Link
                      to={`/start-checkout?course=${examId}&interval=monthly`}
                      className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      ${isFounder ? pricing.founderMonthly : pricing.monthly}/mo
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Founder pricing notice */}
        {isFounderPricingActive() && !isPremium && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              Founder pricing available — lock in 40%+ savings through April 2028!
            </p>
          </div>
        )}
      </Card>

      {/* Menu Items */}
      <Card noPadding>
        <Link
          to="/progress"
          className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-slate-100">Full Progress</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">Detailed stats, topic breakdown, study plan</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>

        <Link
          to="/achievements"
          className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-slate-100">Achievements</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">Badges and milestones</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>

        {FEATURES.community && (
          <Link
            to="/community"
            className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <span className="font-medium text-slate-900 dark:text-slate-100">Community</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">Leaderboard, compare with other candidates</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Link>
        )}

        <Link
          to="/settings?tab=study"
          className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-slate-100">Settings</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">Profile, notifications, study preferences</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>

        <Link
          to="/help"
          className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-slate-100">Help & Legal</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">Support, terms, privacy</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>

        <Button
          variant="danger"
          fullWidth
          onClick={handleSignOut}
          leftIcon={LogOut}
          className="justify-start"
        >
          Sign Out
        </Button>
      </Card>

      {/* Version */}
      <div className="text-center text-xs text-slate-600 dark:text-slate-400">
        <p>VoraPrep v1.1</p>
        <p className="mt-1">
          Not affiliated with {course?.metadata?.examProvider?.split(' (')[0] || 'any exam provider'} or any licensing board.
        </p>
      </div>
      </div>
    </div>
  );
};

export default You;
