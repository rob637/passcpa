import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  ChevronRight,
  Flame,
  Calendar,
  BarChart3,
  Trophy,
  LogOut,
  Camera,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CPA_SECTIONS } from '../../config/examConfig';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { format, subDays, eachDayOfInterval, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { calculateExamReadiness, ReadinessData } from '../../utils/examReadiness';
import { fetchAllLessons } from '../../services/lessonService';
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
        <span className="text-xs text-slate-500">Ready</span>
      </div>
    </div>
  );
};

// Weekly Activity Chart
const WeeklyChart = ({ activity }: { activity: { date: Date; questions: number }[] }) => {
  const maxQuestions = Math.max(...activity.map(d => d.questions), 1);
  
  return (
    <div className="flex items-end justify-between gap-1 h-16">
      {activity.map((day, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div 
            className={clsx(
              'w-full rounded-t transition-all',
              day.questions > 0 ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'
            )}
            style={{ height: `${Math.max((day.questions / maxQuestions) * 100, day.questions > 0 ? 20 : 10)}%` }}
          />
          <span className="text-[10px] text-slate-400 mt-1">
            {format(day.date, 'EEE').charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
};

const You: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();
  const { currentStreak, getTopicPerformance, getLessonProgress } = useStudy();
  const { courseId } = useCourse();
  const [weeklyActivity, setWeeklyActivity] = useState<{ date: Date; questions: number }[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    studyMinutes: 0,
    accuracy: 0,
  });
  const [_topicPerformance, setTopicPerformance] = useState<{ id: string; topic: string; accuracy: number; questions: number }[]>([]);
  const [readinessData, setReadinessData] = useState<ReadinessData | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [_loading, setLoading] = useState(true);

  // Get user info
  const profile = userProfile as any;
  const displayName = profile?.displayName || 'User';
  const firstName = displayName.split(' ')[0];
  const examSection = profile?.examSection || 'FAR';
  const sectionInfo = CPA_SECTIONS[examSection as keyof typeof CPA_SECTIONS];
  
  // Calculate days until exam
  const examDate = profile?.examDate;
  const daysUntilExam = examDate ? differenceInDays(new Date(examDate), new Date()) : null;

  // Load data
  useEffect(() => {
    if (!user?.uid) return;

    const loadData = async () => {
      setLoading(true);
      try {
        // Get weekly activity (last 7 days for the chart)
        const days = eachDayOfInterval({
          start: subDays(new Date(), 6),
          end: new Date(),
        });

        // Track section-specific stats
        let sectionQuestions = 0;
        let sectionCorrect = 0;
        let sectionMinutes = 0;

        const dailyData = await Promise.all(
          days.map(async (date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const logRef = doc(db, 'users', user.uid, 'daily_log', dateKey);
            const logSnap = await getDoc(logRef);

            if (logSnap.exists()) {
              const data = logSnap.data();
              
              // Filter activities by current section for section-specific stats
              const activities = data.activities || [];
              const sectionActivities = activities.filter(
                (a: { section?: string; type?: string }) => 
                  a.section === examSection || 
                  // Include legacy activities without section (before this update)
                  (!a.section && a.type === 'mcq')
              );
              
              // Count section-specific MCQs
              const mcqActivities = sectionActivities.filter((a: { type?: string }) => a.type === 'mcq');
              const correctMcqs = mcqActivities.filter((a: { isCorrect?: boolean }) => a.isCorrect).length;
              
              sectionQuestions += mcqActivities.length;
              sectionCorrect += correctMcqs;
              
              // Estimate time per activity (activities store timeSpentSeconds)
              const sectionTime = sectionActivities.reduce(
                (sum: number, a: { timeSpentSeconds?: number }) => sum + (a.timeSpentSeconds || 0), 
                0
              ) / 60; // Convert to minutes
              sectionMinutes += sectionTime;

              return {
                date,
                questions: mcqActivities.length, // Section-specific for chart
              };
            }
            return { date, questions: 0 };
          })
        );
        
        setWeeklyActivity(dailyData);

        // Get topic performance (section-filtered)
        let topicsData: { id: string; topic: string; accuracy: number; questions: number }[] = [];
        if (getTopicPerformance) {
          topicsData = await getTopicPerformance();
        }
        setTopicPerformance(topicsData);

        // Get lesson progress for section
        let lessonsCompletedCount = 0;
        if (getLessonProgress) {
          const lessonProgress = await getLessonProgress();
          lessonsCompletedCount = Object.values(lessonProgress).filter(
            (lesson: any) => lesson.section === examSection && lesson.progress >= 100
          ).length;
        }

        // Get total lessons for section
        const allLessons = await fetchAllLessons(courseId);
        const sectionLessons = allLessons.filter(l => l.section === examSection);
        const totalLessonsCount = sectionLessons.length;

        setOverallStats({
          totalQuestions: sectionQuestions,
          correctAnswers: sectionCorrect,
          lessonsCompleted: lessonsCompletedCount,
          totalLessons: totalLessonsCount,
          studyMinutes: Math.round(sectionMinutes),
          accuracy: sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0,
        });

        // Calculate readiness with proper parameters
        const readiness = calculateExamReadiness(
          { totalQuestions: sectionQuestions, accuracy: sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0 },
          topicsData,
          lessonsCompletedCount,
          totalLessonsCount
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

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center overflow-hidden">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="" className="w-20 h-20 rounded-full object-cover" />
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
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-white dark:bg-slate-700 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
              {isUploadingPhoto ? (
                <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
              ) : (
                <Camera className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>

          {/* Name & Section */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{displayName}</h1>
            <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span 
                className="px-2 py-0.5 text-xs font-semibold rounded-full text-white"
                style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
              >
                {sectionInfo?.shortName || examSection}
              </span>
              {daysUntilExam !== null && daysUntilExam > 0 && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {daysUntilExam} days left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
              <Flame className="w-4 h-4" />
              <span className="font-bold text-lg">{currentStreak}</span>
            </div>
            <span className="text-xs text-slate-500">Streak</span>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{overallStats.totalQuestions}</div>
            <span className="text-xs text-slate-500">Questions</span>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{overallStats.accuracy}%</div>
            <span className="text-xs text-slate-500">Accuracy</span>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{Math.round(overallStats.studyMinutes / 60)}h</div>
            <span className="text-xs text-slate-500">Study Time</span>
          </div>
        </div>
      </div>

      {/* Readiness & Weekly Activity */}
      <div className="grid grid-cols-2 gap-4">
        {/* Readiness */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Exam Ready</h3>
          <div className="flex justify-center">
            <ReadinessRing readiness={readinessData?.overall || 0} size={80} />
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">This Week</h3>
            <span className="text-xs text-primary-600 font-medium">{weeklyQuestions} Q</span>
          </div>
          <WeeklyChart activity={weeklyActivity} />
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
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
              <p className="text-xs text-slate-500">Detailed stats, topic breakdown, study plan</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
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
              <p className="text-xs text-slate-500">Badges and milestones</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>

        <Link
          to="/settings"
          className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-slate-100">Settings</span>
              <p className="text-xs text-slate-500">Profile, notifications, study preferences</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>

        <Link
          to="/terms"
          className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <span className="font-medium text-slate-900 dark:text-slate-100">Help & Legal</span>
              <p className="text-xs text-slate-500">Support, terms, privacy</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="font-medium text-red-600 dark:text-red-400">Sign Out</span>
          </div>
        </button>
      </div>

      {/* Version */}
      <div className="text-center text-xs text-slate-400">
        <p>VoraPrep v1.0</p>
        <p className="mt-1">
          Not affiliated with AICPA, NASBA, or any state board.
        </p>
      </div>
    </div>
  );
};

export default You;
