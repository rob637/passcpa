import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logger from '../../utils/logger';
import {
  User as UserIcon,
  Bell,
  Target,
  Shield,
  MessageSquare,
  Wifi,
  LucideIcon,
  Loader2,
  Camera,
  Info,
  Sun,
  Moon,
  Monitor,
  Palette,
  RefreshCw,
  CheckCircle,
  Smartphone,
  Users,
  Award,
  CreditCard,
  ExternalLink,
  ChevronDown,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { triggerUpdateBanner } from '../common/UpdateBanner';
import { Button } from '../common/Button';
import { PageHeader } from '../navigation';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { useTabKeyboard } from '../../hooks/useKeyboardNavigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth, functions } from '../../config/firebase';
import { linkWithPopup, unlink, GoogleAuthProvider } from 'firebase/auth';
import { useTheme } from '../../providers/ThemeProvider';
// import { useTour } from '../OnboardingTour'; // Not migrated yet
import { DAILY_GOAL_PRESETS, CORE_SECTIONS, DISCIPLINE_SECTIONS_2026, isBefore2026Blueprint } from '../../config/examConfig';
import { getSectionDisplayInfo, getDefaultSection, getCurrentSectionForCourse } from '../../utils/sectionUtils';
import { createExamDateUpdate, getExamDate } from '../../utils/profileHelpers';
import {
  setupDailyReminder,
  getDailyReminderSettings,
  setWeeklyReportEnabled,
} from '../../services/pushNotifications';
import { getCacheStatus, clearCache, cacheQuestions } from '../../services/offlineCache';
import { fetchQuestions } from '../../services/questionService';
import { useSubscription, EXAM_PRICING, isFounderPricingActive } from '../../services/subscription';
import { isCourseActive } from '../../courses';
import type { CourseId } from '../../types/course';
import { httpsCallable } from 'firebase/functions';
import { InviteFriends } from '../common/InviteFriends';
import { PassedCelebration } from '../common/PassedCelebration';
import { Timestamp } from 'firebase/firestore';
import { clearTodaysPlan } from '../../services/dailyPlanPersistence';
import clsx from 'clsx';

// Helper to convert various date formats to YYYY-MM-DD string
const formatDateForInput = (date: Timestamp | Date | string | null | undefined): string => {
  if (!date) return '';
  
  try {
    // If it's a Firestore Timestamp
    if (date && typeof date === 'object' && 'toDate' in date && typeof date.toDate === 'function') {
      return date.toDate().toISOString().split('T')[0];
    }
    // If it's already a Date object
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    // If it's a string (already formatted or ISO string)
    if (typeof date === 'string') {
      // If it's already YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
      // Try parsing as ISO string
      return new Date(date).toISOString().split('T')[0];
    }
  } catch (e) {
    logger.error('Error formatting date:', e);
  }
  return '';
};

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const Settings: React.FC = () => {
  const { user, userProfile, updateUserProfile, resetPassword, signOut } = useAuth();
  const { courseId, course } = useCourse();
  const { darkMode, themeMode, setThemeMode } = useTheme();
  const { subscription, getExamAccess } = useSubscription();
  const navigate = useNavigate();
  // const { startTour, resetTour } = useTour();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateCheckResult, setUpdateCheckResult] = useState<'none' | 'available' | null>(null);
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile from auth
  const profile = userProfile;

  // Form states
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  // Use getCurrentSectionForCourse to validate profile section is valid for current course
  const [examSection, setExamSection] = useState(getCurrentSectionForCourse(profile?.examSection, courseId));
  const [dailyGoal, setDailyGoal] = useState(profile?.dailyGoal || 50);
  // Use getExamDate for multi-course support (handles single-exam courses like CISA/CFP)
  const [examDate, setExamDate] = useState(formatDateForInput(getExamDate(profile, examSection, courseId)));

  // Sync form state when profile changes (e.g., after reset) or courseId changes
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      // Validate profile section is valid for current course
      const validSection = getCurrentSectionForCourse(profile.examSection, courseId);
      setExamSection(validSection);
      setDailyGoal(profile.dailyGoal || 50);
      // Use getExamDate helper for multi-course exam date lookup
      setExamDate(formatDateForInput(getExamDate(profile as any, validSection, courseId)));
    }
  }, [profile, courseId]);
  
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    streakReminder: true,
    newContent: false,
  });
  
  // I Passed celebration modal
  const [showPassedCelebration, setShowPassedCelebration] = useState(false);

  // New states for enhanced settings
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York');
  const [cacheStatus, setCacheStatus] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Check notification permission on mount
  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted' && user?.uid) {
        // Import and call requestFCMToken
        const { requestFCMToken } = await import('../../services/pushNotifications');
        await requestFCMToken(user.uid);
      }
    }
  };
  
  // Load settings on mount
  useEffect(() => {
    // Reminder settings - prefer profile settings, fallback to localStorage
    const reminderSettings = getDailyReminderSettings();
    
    // Use profile setting if available, otherwise use localStorage
    const dailyReminderEnabled = profile?.dailyReminderEnabled !== undefined 
      ? profile.dailyReminderEnabled 
      : reminderSettings.enabled;
    
    const dailyReminderTime = profile?.dailyReminderTime || reminderSettings.time || '09:00';
    
    setReminderTime(dailyReminderTime);
    setNotifications((prev) => ({ ...prev, dailyReminder: dailyReminderEnabled }));

    // Load notification preferences from profile
    if (profile?.weeklyReportEnabled !== undefined) {
      setNotifications((prev) => ({ ...prev, weeklyReport: profile.weeklyReportEnabled ?? false }));
    }
    
    // Load timezone from profile or auto-detect
    if (profile?.timezone) {
      setTimezone(profile.timezone);
    }

    // Cache status
    getCacheStatus().then(setCacheStatus);
  }, [profile]);

  // Clear cache
  const handleClearCache = async () => {
    await clearCache();
    const status = await getCacheStatus();
    setCacheStatus(status);
  };

  // Download questions for offline use
  const handleDownloadOffline = async () => {
    setIsDownloading(true);
    try {
      // Fetch questions for user's section
      const section = (profile?.examSection || getDefaultSection(courseId)) as any;
      const questions = await fetchQuestions({ section, count: 500, courseId });
      await cacheQuestions(questions);
      const status = await getCacheStatus();
      setCacheStatus(status);
      alert(`Successfully cached ${questions.length} questions for offline use!`);
    } catch (error: any) {
      logger.error('Error downloading for offline:', error);
      // Provide more helpful error messages
      if (error?.message?.includes('IndexedDB is not available')) {
        alert('Offline storage is not available in private/incognito mode. Please use a regular browser window.');
      } else if (error?.message?.includes('corrupted')) {
        alert('Your offline storage appears to be corrupted. Please go to your browser settings, clear site data for this site, and try again.');
      } else {
        alert('Failed to download content. Please try again or check your browser settings.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Link/Unlink Google Account
  const handleLinkGoogle = async () => {
    if (!auth.currentUser) return;
    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(auth.currentUser, provider);
      alert('Google account linked successfully!');
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        alert('This Google account is already associated with another user account. Please sign in with Google to use that account.');
      } else {
        logger.error('Error linking account:', error);
        alert('Failed to link account. Please try again.');
      }
    }
  };

  const handleUnlinkGoogle = async () => {
    if (!auth.currentUser) return;
    try {
      // Prevent unlinking if it's the only provider
      if (auth.currentUser.providerData.length === 1 && auth.currentUser.providerData[0].providerId === 'google.com') {
        alert('You cannot remove the only sign-in method. Please set a password first.'); // Simplified logic
        return;
      }
      
      await unlink(auth.currentUser, 'google.com');
      alert('Google account disconnected.');
    } catch (error) {
       logger.error('Error unlinking:', error);
       alert('Failed to disconnect account.');
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.uid) return;

    // Validate file type and size
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
      const photoURL = await getDownloadURL(storageRef);
      await updateUserProfile({ photoURL });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      logger.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Create multi-course aware exam date update
      // Pass courseId so single-exam courses (CFP, CISA) use course ID as key
      const examDateUpdate = createExamDateUpdate(
        userProfile,
        examSection || userProfile?.examSection || getDefaultSection(courseId),
        examDate ? new Date(examDate) : null,
        courseId
      );
      
      // Save profile settings
      await updateUserProfile({
        displayName,
        examSection,
        dailyGoal,
        ...examDateUpdate,
        dailyReminderEnabled: notifications.dailyReminder,
        dailyReminderTime: reminderTime || '09:00',
        weeklyReportEnabled: notifications.weeklyReport,
        timezone,
      });
      
      // Setup daily reminder using unified notification service
      if (user?.uid) {
        await setupDailyReminder(
          user.uid,
          notifications.dailyReminder,
          reminderTime || '09:00'
        );
        
        // Update weekly report preference
        await setWeeklyReportEnabled(user.uid, notifications.weeklyReport);
        
        // Clear daily plan cache to force regeneration with new exam date/daily goal
        // This ensures the plan recalculates intensity based on the new exam date
        await clearTodaysPlan(user.uid, examSection);
        logger.log('Daily plan cache cleared - will regenerate with updated settings');
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      logger.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;
    setIsManagingSubscription(true);
    try {
      const createPortalSession = httpsCallable<{ returnUrl: string }, { url: string }>(
        functions,
        'createCustomerPortalSession'
      );
      const result = await createPortalSession({
        returnUrl: window.location.href
      });
      window.location.href = result.data.url;
    } catch (error) {
      logger.error('Error opening subscription portal:', error);
      alert('Unable to open subscription management. Please try again.');
      setIsManagingSubscription(false);
    }
  };

  const [pwaState, pwaActions] = usePWAInstall();

  const tabs: Tab[] = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'study', label: 'Study Plan', icon: Target },
    { id: 'invite', label: 'Invite Friends', icon: Users },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'Feedback & Support', icon: MessageSquare },
    { id: 'offline', label: 'Offline', icon: Wifi },
    ...(!pwaState.isInstalled ? [{ id: 'install' as const, label: 'Install App', icon: Download }] : []),
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'about', label: 'About', icon: Info },
  ];

  // Keyboard navigation for tabs
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const { tabListProps, getTabProps } = useTabKeyboard(
    tabs.map(t => t.id),
    activeTab,
    handleTabChange
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <PageHeader 
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile dropdown menu */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-56 flex-shrink-0">
          <nav 
            className="flex flex-col gap-1"
            {...tabListProps}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                )}
                {...getTabProps(tab.id)}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="card">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center overflow-hidden">
                        {profile?.photoURL ? (
                          <img src={profile.photoURL} alt="Your profile photo" className="w-16 h-16 rounded-full object-cover" loading="lazy" />
                        ) : (
                          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {displayName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        )}
                      </div>
                      {isUploadingPhoto && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        variant="secondary"
                        size="sm"
                        leftIcon={Camera}
                      >
                        {isUploadingPhoto ? 'Uploading...' : 'Change Photo'}
                      </Button>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Max 5MB, JPG/PNG</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Study Plan Tab */}
            {activeTab === 'study' && (
              <div className="card-body space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: course?.color || '#3b82f6' }}
                    >
                      {course?.shortName || 'CPA'}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{course?.name || 'CPA Exam Review'} Settings</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Use the course selector in the sidebar to switch exams</p>
                    </div>
                  </div>

                  {/* Exam Section - All Courses */}
                  {course && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Current Exam Section
                    </label>
                    {(() => {
                      // For CPA: Determine available sections based on user's exam date
                      let availableSections: string[];
                      if (courseId === 'cpa') {
                        // BEC was retired December 15, 2023 - only BAR/ISC/TCP available
                        // Blueprint date only affects TAX LAW content (OBBBA), not section availability
                        availableSections = [...CORE_SECTIONS, ...DISCIPLINE_SECTIONS_2026];
                      } else {
                        // For other courses, show all sections except PREP (strategy sections)
                        availableSections = course.sections
                          .filter((s: { id: string }) => s.id !== 'PREP')
                          .map((s: { id: string }) => s.id);
                      }
                      
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {course.sections
                            .filter((s: { id: string }) => availableSections.includes(s.id))
                            .map((section: { id: string }) => {
                              const displayInfo = getSectionDisplayInfo(section.id, courseId);
                              if (!displayInfo) return null;
                              return (
                            <button
                              key={section.id}
                              onClick={() => setExamSection(section.id)}
                              className={clsx(
                                'p-3 rounded-xl border-2 text-left transition-all',
                                examSection === section.id
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                  : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500'
                              )}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-2"
                                style={{ backgroundColor: displayInfo.color }}
                              >
                                {displayInfo.shortName}
                              </div>
                              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {displayInfo.shortName}
                              </div>
                            </button>
                              );
                          })}
                        </div>
                      );
                    })()}
                    
                    {/* Blueprint Info Note - CPA only */}
                    {courseId === 'cpa' && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex gap-2">
                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          {isBefore2026Blueprint() ? (
                            <>
                              <strong>2025 vs 2026 Blueprint:</strong> Choose one discipline section (BAR, ISC, or TCP).
                              Starting July 1, 2026, REG and TCP will have significant tax law updates (OBBBA).
                              Content will adapt automatically based on your target exam date.
                            </>
                          ) : (
                            <>
                              <strong>2026 Blueprint:</strong> Choose one discipline section (BAR, ISC, or TCP) 
                              based on your career path. AUD, FAR, and REG are required for all candidates.
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                  )}

                  {/* Exam Date */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Target Exam Date
                    </label>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full sm:w-auto px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:[color-scheme:dark]"
                    />
                  </div>

                  {/* Daily Goal */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Daily Point Goal
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {DAILY_GOAL_PRESETS.map((preset: any) => (
                        <button
                          key={preset.points}
                          onClick={() => setDailyGoal(preset.points)}
                          className={clsx(
                            'p-3 rounded-xl border-2 text-left transition-all',
                            dailyGoal === preset.points
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                              : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500'
                          )}
                        >
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{preset.points} pts</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{preset.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* I Passed Celebration */}
                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Passed Your Exam?
                    </h3>
                    <button
                      onClick={() => setShowPassedCelebration(true)}
                      className="flex items-center gap-3 w-full p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-700 dark:text-emerald-400">I Passed!</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Celebrate and share your success</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Invite Friends Tab */}
            {activeTab === 'invite' && (
              <div className="card-body">
                <InviteFriends />
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Appearance</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Choose how VoraPrep looks to you. Select a theme preference below.
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setThemeMode('light')}
                      className={clsx(
                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                        themeMode === 'light'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                      )}
                    >
                      <div className={clsx(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        themeMode === 'light' ? 'bg-primary-100 dark:bg-primary-800' : 'bg-slate-100 dark:bg-slate-800'
                      )}>
                        <Sun className={clsx(
                          'w-6 h-6',
                          themeMode === 'light' ? 'text-primary-600' : 'text-slate-500 dark:text-slate-400'
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className={clsx(
                          'font-semibold',
                          themeMode === 'light' ? 'text-primary-700 dark:text-primary-300' : 'text-slate-900 dark:text-white'
                        )}>Light</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Clean, bright interface for daytime studying
                        </div>
                      </div>
                      {themeMode === 'light' && (
                        <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setThemeMode('dark')}
                      className={clsx(
                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                        themeMode === 'dark'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                      )}
                    >
                      <div className={clsx(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        themeMode === 'dark' ? 'bg-primary-100 dark:bg-primary-800' : 'bg-slate-100 dark:bg-slate-800'
                      )}>
                        <Moon className={clsx(
                          'w-6 h-6',
                          themeMode === 'dark' ? 'text-primary-600' : 'text-slate-500 dark:text-slate-400'
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className={clsx(
                          'font-semibold',
                          themeMode === 'dark' ? 'text-primary-700 dark:text-primary-300' : 'text-slate-900 dark:text-white'
                        )}>Dark</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Easy on the eyes for night-time study sessions
                        </div>
                      </div>
                      {themeMode === 'dark' && (
                        <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setThemeMode('system')}
                      className={clsx(
                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                        themeMode === 'system'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600'
                      )}
                    >
                      <div className={clsx(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        themeMode === 'system' ? 'bg-primary-100 dark:bg-primary-800' : 'bg-slate-100 dark:bg-slate-800'
                      )}>
                        <Monitor className={clsx(
                          'w-6 h-6',
                          themeMode === 'system' ? 'text-primary-600' : 'text-slate-500 dark:text-slate-400'
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className={clsx(
                          'font-semibold',
                          themeMode === 'system' ? 'text-primary-700 dark:text-primary-300' : 'text-slate-900 dark:text-white'
                        )}>System</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Automatically match your device settings
                        </div>
                      </div>
                      {themeMode === 'system' && (
                        <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      <strong>Current:</strong> {darkMode ? 'Dark mode active' : 'Light mode active'}
                      {themeMode === 'system' && ' (following system preference)'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Offline Tab */}
            {activeTab === 'offline' && (
              <div className="card-body space-y-6">
                 <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Offline Storage</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Download questions for your exam section to study without an internet connection.
                    </p>
                    
                    {/* Download Section */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-4">
                      <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Download for Offline Study</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        Download up to 500 {getSectionDisplayInfo(profile?.examSection || getDefaultSection(courseId), courseId)?.shortName || course?.shortName} questions to practice anywhere, anytime.
                      </p>
                      <button
                        onClick={handleDownloadOffline}
                        disabled={isDownloading}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Downloading...
                          </>
                        ) : (
                          'Download Questions'
                        )}
                      </button>
                    </div>

                    {/* Cache Status */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-3">Current Cache</h3>
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-slate-600 dark:text-slate-400">Questions Cached</span>
                         <span className="font-bold text-slate-900 dark:text-white">{cacheStatus?.questions_count || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
                         <span className="text-slate-600 dark:text-slate-400">
                           {cacheStatus?.questions_cached_at ? new Date(cacheStatus.questions_cached_at).toLocaleDateString() : 'Never'}
                         </span>
                      </div>
                    </div>

                    {/* Clear Cache */}
                    {(cacheStatus?.questions_count > 0) && (
                      <Button
                        onClick={handleClearCache}
                        variant="danger"
                        size="sm"
                      >
                        Clear Offline Cache
                      </Button>
                    )}
                 </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notification Preferences</h2>
                  
                  {/* Browser Notification Permission Status */}
                  {typeof Notification !== 'undefined' && notificationPermission !== 'granted' && (
                    <div className={`p-4 rounded-xl mb-4 ${notificationPermission === 'denied' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${notificationPermission === 'denied' ? 'text-red-900 dark:text-red-200' : 'text-amber-900 dark:text-amber-200'}`}>
                            {notificationPermission === 'denied' ? '🔕 Notifications Blocked' : '🔔 Enable Browser Notifications'}
                          </div>
                          <div className={`text-sm ${notificationPermission === 'denied' ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'}`}>
                            {notificationPermission === 'denied' 
                              ? 'You\'ve blocked notifications. Enable them in your browser settings to receive study reminders.'
                              : 'Allow notifications to receive daily study reminders in your browser.'}
                          </div>
                          {notificationPermission === 'denied' && (
                            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                              <strong>To fix:</strong> Click the lock/tune icon in your browser's address bar → Site settings → Notifications → Allow. Then refresh this page.
                            </div>
                          )}
                        </div>
                        {notificationPermission !== 'denied' && (
                          <Button
                            onClick={requestNotificationPermission}
                            variant="primary"
                            size="sm"
                            className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap"
                          >
                            Enable Now
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {notificationPermission === 'granted' && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl mb-4">
                      <div className="text-sm text-green-700 dark:text-green-300">✓ Browser notifications enabled</div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Daily Study Reminder</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Get a push notification to maintain your streak</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.dailyReminder}
                          onChange={(e) => setNotifications(prev => ({ ...prev, dailyReminder: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    {notifications.dailyReminder && (
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl ml-4">
                        <div className="font-medium text-slate-900 dark:text-white">Reminder Time</div>
                        <input
                          type="time"
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    )}
                    
                    {/* Timezone Selector */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Your Timezone</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Used for notification timing</div>
                      </div>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm max-w-[200px]"
                      >
                        <optgroup label="North America">
                          <option value="America/New_York">Eastern (ET)</option>
                          <option value="America/Chicago">Central (CT)</option>
                          <option value="America/Denver">Mountain (MT)</option>
                          <option value="America/Los_Angeles">Pacific (PT)</option>
                          <option value="America/Anchorage">Alaska (AKT)</option>
                          <option value="Pacific/Honolulu">Hawaii (HT)</option>
                        </optgroup>
                        <optgroup label="Asia">
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                          <option value="Asia/Shanghai">China (CST)</option>
                          <option value="Asia/Singapore">Singapore (SGT)</option>
                          <option value="Asia/Kolkata">India (IST)</option>
                          <option value="Asia/Dubai">Dubai (GST)</option>
                        </optgroup>
                        <optgroup label="Europe">
                          <option value="Europe/London">London (GMT/BST)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Europe/Berlin">Berlin (CET)</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option value="Australia/Sydney">Sydney (AEST)</option>
                          <option value="Pacific/Auckland">Auckland (NZST)</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Weekly Progress Report</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Email summary of your study performance every Sunday</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReport}
                          onChange={(e) => setNotifications(prev => ({ ...prev, weeklyReport: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback & Support Tab */}
            {activeTab === 'feedback' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Feedback & Support</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                      <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Have a suggestion?</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        We value your input! Let us know how we can make VoraPrep better for you.
                      </p>
                      <a 
                        href="mailto:support@voraprep.com?subject=VoraPrep%20Feedback"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Send Feedback
                      </a>
                    </div>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-2">Report an Issue</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Found a bug or content error? Please report it so we can fix it immediately.
                      </p>
                      <a 
                        href="mailto:support@voraprep.com?subject=Bug%20Report"
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Report a Bug
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Management</h2>
                  
                  <div className="space-y-6">
                    {/* Account Info */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                            User ID
                          </div>
                          <div className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate">
                            {user?.uid}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Email
                          </div>
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            {user?.email}
                          </div>
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Account Created
                           </div>
                           <div className="text-sm text-slate-700 dark:text-slate-300">
                             {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                           </div>
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Last Login
                           </div>
                           <div className="text-sm text-slate-700 dark:text-slate-300">
                             {user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Just now'}
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6"></div>

                    <h3 className="font-medium text-slate-900 dark:text-white mb-3">Linked Accounts</h3>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-600 shrink-0">
                             <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                             </svg>
                           </div>
                           <div>
                             <div className="font-medium text-slate-900 dark:text-white">Google Account</div>
                             <div className="text-sm text-slate-600 dark:text-slate-400">
                               {user?.providerData?.some(p => p.providerId === 'google.com') 
                                 ? 'Connected' 
                                 : 'Not connected'}
                             </div>
                           </div>
                         </div>
                         {user?.providerData?.some(p => p.providerId === 'google.com') ? (
                           <button 
                             onClick={handleUnlinkGoogle}
                             className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                           >
                             Disconnect
                           </button>
                         ) : (
                           <button 
                             onClick={handleLinkGoogle}
                             className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                           >
                             Connect
                           </button>
                         )}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6"></div>

                    {/* Subscription Management — Per-Exam */}
                    <h3 className="font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Subscriptions & Trials
                    </h3>
                    <div className="space-y-3 mb-6">
                      {(['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'] as CourseId[]).filter(isCourseActive).map(examId => {
                        const access = getExamAccess(examId);
                        const examName = examId.toUpperCase();
                        const pricing = EXAM_PRICING[examId];
                        const isActive = examId === courseId;
                        // Show: current exam always, other exams if user has interacted
                        const hasInteraction = access.isPaid || access.isTrialing || access.trialExpired;
                        if (!isActive && !hasInteraction) return null;

                        return (
                          <div key={examId} className={clsx(
                            'rounded-xl border p-4 transition-colors',
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          )}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={clsx(
                                  'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm',
                                  access.isPaid
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : access.isTrialing
                                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                )}>
                                  {examName}
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                    {examName} Exam
                                    {isActive && (
                                      <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-1.5 py-0.5 rounded">Current</span>
                                    )}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {access.isPaid ? (
                                      <span className={`${access.cancelAtPeriodEnd ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'} flex items-center gap-1`}>
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        {access.cancelAtPeriodEnd ? 'Cancels' : 'Subscribed'}
                                        {access.currentPeriodEnd && (
                                          <span className="text-slate-500">
                                            {access.cancelAtPeriodEnd
                                              ? ` on ${new Date(access.currentPeriodEnd).toLocaleDateString()}`
                                              : ` · Renews ${new Date(access.currentPeriodEnd).toLocaleDateString()}`
                                            }
                                          </span>
                                        )}
                                      </span>
                                    ) : access.isTrialing ? (
                                      <span className="text-blue-600 dark:text-blue-400">
                                        Trial · {access.trialDaysRemaining}d remaining
                                        {access.trialEndDate && (
                                          <span className="text-slate-500"> · Ends {new Date(access.trialEndDate).toLocaleDateString()}</span>
                                        )}
                                      </span>
                                    ) : access.trialExpired ? (
                                      <span className="text-amber-600 dark:text-amber-400">Trial expired</span>
                                    ) : (
                                      <span>Free trial available</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {/* Upgrade buttons for non-paid exams */}
                                {!access.isPaid && (access.trialExpired || access.isTrialing) && (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => navigate(`/start-checkout?course=${examId}&interval=monthly`)}
                                      className="flex items-center gap-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                      <span className="text-xs">
                                        ${isFounderPricingActive() ? pricing.founderMonthly : pricing.monthly}/mo
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => navigate(`/start-checkout?course=${examId}&interval=annual`)}
                                      className="flex items-center gap-1.5 text-sm bg-primary-600 hover:bg-primary-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                      <span className="text-xs">
                                        ${isFounderPricingActive() ? pricing.founderAnnual : pricing.annual}/yr
                                      </span>
                                      <span className="text-xs bg-green-500/20 text-green-100 px-1.5 py-0.5 rounded font-normal">Save 40%+</span>
                                    </button>
                                  </div>
                                )}
                                {/* Manage button for paid subscribers */}
                                {access.isPaid && subscription?.stripeCustomerId && (
                                  <button
                                    onClick={handleManageSubscription}
                                    disabled={isManagingSubscription}
                                    className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    {isManagingSubscription ? (
                                      <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Opening...
                                      </>
                                    ) : (
                                      <>
                                        Manage
                                        <ExternalLink className="w-4 h-4" />
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-slate-200 pt-6"></div>

                    {/* Actions */}
                    <h3 className="font-medium text-slate-900 dark:text-white mb-3">Security & Session</h3>
                    <div className="space-y-3">
                      <Button
                        onClick={async () => {
                          try {
                            await resetPassword(user?.email || '');
                            alert('Password reset email sent! Check your inbox.');
                          } catch (err) {
                            alert('Failed to send reset email. Please try again.');
                          }
                        }}
                        variant="secondary"
                        leftIcon={Shield}
                        className="w-full sm:w-auto"
                      >
                        Change Password
                      </Button>
                      <Button
                        onClick={() => signOut()}
                        variant="secondary"
                        className="w-full sm:w-auto"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Install App Tab */}
            {activeTab === 'install' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Install VoraPrep</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Install VoraPrep on your device for the best study experience. It works just like a native app — instant loading, offline access, and always one tap away.
                  </p>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                      <Wifi className="w-6 h-6 text-blue-500 mb-2" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Study Offline</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">No internet needed</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                      <Zap className="w-6 h-6 text-green-500 mb-2" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">2x Faster</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instant loading</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                      <Smartphone className="w-6 h-6 text-purple-500 mb-2" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Home Screen</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">One tap to study</span>
                    </div>
                  </div>

                  {/* Platform-specific instructions */}
                  {pwaState.isIOS ? (
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Install on iPhone / iPad
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Open in Safari</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">This must be done in Safari — Chrome and other browsers don't support it on iOS.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Tap the Share button</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Share className="w-4 h-4 inline" /> The square with an arrow at the bottom of Safari
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">3</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Scroll down and tap "Add to Home Screen"</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <PlusSquare className="w-4 h-4 inline" /> It may be below the fold — scroll down in the share sheet
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">4</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Tap "Add"</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">VoraPrep will appear on your home screen like a regular app!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : pwaState.canInstall ? (
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        {pwaState.isAndroid ? 'Install on Android' : 'Install on Your Device'}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Click the button below to install VoraPrep. It takes just a second and doesn't use much storage.
                      </p>
                      <Button
                        onClick={async () => {
                          const success = await pwaActions.promptInstall();
                          if (success) {
                            logger.info('PWA installed from Settings');
                          }
                        }}
                        variant="primary"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Install VoraPrep
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        How to Install
                      </h3>
                      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <p><strong>Chrome (Android):</strong> Tap the menu (three dots) → "Install app" or "Add to Home screen"</p>
                        <p><strong>Chrome (Desktop):</strong> Click the install icon in the address bar, or go to Menu → "Install VoraPrep"</p>
                        <p><strong>Edge:</strong> Click the install icon in the address bar, or go to Menu → Apps → "Install this site as an app"</p>
                        <p><strong>Firefox:</strong> Firefox doesn't support PWA install — try Chrome or Edge for the best experience</p>
                      </div>
                    </div>
                  )}

                  {/* Already installed message */}
                  {pwaState.isInstalled && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 mt-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-medium text-green-900 dark:text-green-200">VoraPrep is installed!</p>
                          <p className="text-sm text-green-700 dark:text-green-300">You're running the app version. Enjoy faster loading and offline access.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FAQ */}
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                        What is a PWA?
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">
                        A Progressive Web App (PWA) is a website that works like a native app. Once installed, VoraPrep opens in its own window, loads instantly, works offline, and lives on your home screen — no app store needed.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Does it use a lot of storage?
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">
                        No — VoraPrep uses less than 50MB, far less than most apps. Your study progress syncs to the cloud.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Can I uninstall it?
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">
                        Yes! Uninstall it like any other app. On mobile, long-press the icon and tap Remove. On desktop, click the three dots in the title bar → Uninstall.
                      </p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Is this the same as the App Store / Play Store app?
                      </summary>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-4">
                        VoraPrep's PWA is our primary mobile experience. It gives you all the same features with the advantage of always being up to date — no manual updates needed.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">About VoraPrep</h2>
                  
                  <div className="space-y-6">
                    {/* App Info */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                          <Smartphone className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">VoraPrep</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">AI-Powered Exam Prep</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Version
                          </div>
                          <div className="text-sm font-mono text-slate-700 dark:text-slate-300">
                            v{__APP_VERSION__}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Platform
                          </div>
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            {/iPhone|iPad|iPod/.test(navigator.userAgent) ? 'iOS' : /Android/.test(navigator.userAgent) ? 'Android' : 'Web'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Updates Section */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-3">Updates</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        VoraPrep automatically checks for updates. You can also manually check below.
                      </p>
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={async () => {
                            setIsCheckingUpdate(true);
                            setUpdateCheckResult(null);
                            try {
                              // Force service worker update check
                              const registration = await navigator.serviceWorker?.getRegistration();
                              if (registration) {
                                await registration.update();
                                // Wait a moment for the update check to complete
                                await new Promise(resolve => setTimeout(resolve, 1500));
                                // Check if there's a waiting worker (new version available)
                                if (registration.waiting) {
                                  // Check if we just updated (banner uses 30s cooldown)
                                  const justUpdated = localStorage.getItem('pwa-just-updated');
                                  if (justUpdated) {
                                    const elapsed = Date.now() - parseInt(justUpdated, 10);
                                    if (elapsed < 30000) {
                                      // Within cooldown - clear the waiting worker and report up to date
                                      setUpdateCheckResult('none');
                                      return;
                                    }
                                  }
                                  setUpdateCheckResult('available');
                                  triggerUpdateBanner();
                                } else {
                                  setUpdateCheckResult('none');
                                }
                              } else {
                                setUpdateCheckResult('none');
                              }
                            } catch (err) {
                              logger.error('Update check failed:', err);
                              setUpdateCheckResult('none');
                            } finally {
                              setIsCheckingUpdate(false);
                            }
                          }}
                          variant="secondary"
                          leftIcon={RefreshCw}
                          disabled={isCheckingUpdate}
                          className="w-full sm:w-auto"
                        >
                          {isCheckingUpdate ? 'Checking...' : 'Check for Updates'}
                        </Button>
                        {updateCheckResult === 'none' && (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>You're up to date!</span>
                          </div>
                        )}
                        {updateCheckResult === 'available' && (
                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm">
                            <RefreshCw className="w-4 h-4" />
                            <span>Update available - see banner above</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Legal Links */}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-3">Legal</h3>
                      <div className="flex flex-wrap gap-4">
                        <a href="/terms" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</a>
                        <a href="/privacy" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>
                      </div>
                      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                        VoraPrep is not affiliated with AICPA, NASBA, IMA, IIA, ISACA, CFP Board, or any certifying organization. 
                        All exam names are trademarks of their respective owners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button - only show on tabs with saveable settings */}
            {['profile', 'study', 'notifications'].includes(activeTab) && (
              <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  loading={isSaving}
                  variant="primary"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                {saveSuccess && (
                    <div className="ml-4 flex items-center text-green-600 dark:text-green-400 animate-fade-in">
                         <span className="mr-2">Saved!</span>
                         {/* Icon could go here */}
                    </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>

    {/* I Passed Celebration Modal */}
    {showPassedCelebration && (
      <PassedCelebration
        section={examSection}
        userName={displayName || user?.displayName || undefined}
        onClose={() => setShowPassedCelebration(false)}
      />
    )}
  </div>
  );
};

export default Settings;
