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
  Shield,
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
import { calculateExamReadiness, ReadinessData } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';
import { Card } from '../common/Card';
import { useSubscription } from '../../services/subscription';
import logger from '../../utils/logger';
import { isAdminEmail } from '../../config/adminConfig';

const You: React.FC = () => {
  const { user, userProfile, updateUserProfile, signOut } = useAuth();
  const { currentStreak, getTopicPerformance, getLessonProgress } = useStudy();
  const { courseId, course } = useCourse();
  const { getExamAccess } = useSubscription();
  
  // Single-exam courses should aggregate ALL domains/sections (one exam = one set of stats)
  const singleExamCourses = ['cisa', 'cfp', 'cia'];
  const isSingleExamCourse = singleExamCourses.includes(courseId || '');
  
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

  // Get subscription status for current course
  const currentAccess = getExamAccess(courseId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto space-y-4 pb-8">
        
        {/* Page Header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your account and settings
          </p>
        </div>
        
        {/* Compact Profile Header */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center overflow-hidden">
                {userProfile?.photoURL ? (
                  <img src={userProfile.photoURL} alt="Profile" className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
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
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600"
                aria-label="Upload profile photo"
              >
                <Camera className="w-3 h-3 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Name & Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">{displayName}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span 
                  className="px-2 py-0.5 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
                >
                  {sectionInfo?.shortName || examSection}
                </span>
                {daysUntilExam !== null && daysUntilExam > 0 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {daysUntilExam}d to exam
                  </span>
                )}
              </div>
            </div>

            {/* Streak badge */}
            {currentStreak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{currentStreak}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Navigation Menu */}
        <Card noPadding className="divide-y divide-slate-100 dark:divide-slate-700">
          {/* Progress */}
          <Link
            to="/progress"
            className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Progress & Analytics</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Topic breakdown, trends, study time</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>

          {/* Achievements */}
          <Link
            to="/achievements"
            className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Achievements</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Badges and milestones</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>

          {/* Subscription */}
          <Link
            to="/settings?tab=account"
            className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Subscription</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage your plan</p>
            </div>
            {/* Status badge */}
            {currentAccess.isPaid ? (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                Active
              </span>
            ) : currentAccess.isTrialing ? (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                Trial
              </span>
            ) : (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                Upgrade
              </span>
            )}
          </Link>

          {FEATURES.community && (
            <Link
              to="/community"
              className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-slate-900 dark:text-slate-100">Community</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Leaderboard & study groups</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          )}
        </Card>

        {/* Settings & Support */}
        <Card noPadding className="divide-y divide-slate-100 dark:divide-slate-700">
          {/* Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Settings</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Profile, notifications, preferences</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>

          {/* Admin Console - only visible to admins */}
          {(userProfile?.isAdmin || isAdminEmail(user?.email)) && (
            <Link
              to="/admin"
              className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-slate-900 dark:text-slate-100">Admin Console</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Content, SEO, analytics</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </Link>
          )}

          {/* Help */}
          <Link
            to="/help"
            className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Help & Legal</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Support, terms, privacy</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="font-medium text-red-600 dark:text-red-400">Sign Out</span>
          </button>
        </Card>

        {/* Version */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-500 pt-2">
          <p>VoraPrep v1.1</p>
        </div>
      </div>
    </div>
  );
};

export default You;
