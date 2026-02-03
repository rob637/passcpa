import React, { useState, useEffect, useRef, useCallback } from 'react';
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
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { useTabKeyboard } from '../../hooks/useKeyboardNavigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../../config/firebase';
import { linkWithPopup, unlink, GoogleAuthProvider } from 'firebase/auth';
// import { useTheme } from '../../providers/ThemeProvider';
// import { useTour } from '../OnboardingTour'; // Not migrated yet
import { CPA_SECTIONS, DAILY_GOAL_PRESETS, CORE_SECTIONS, DISCIPLINE_SECTIONS_2026, isBefore2026Blueprint } from '../../config/examConfig';
import {
  setupDailyReminder,
  getDailyReminderSettings,
  setWeeklyReportEnabled,
} from '../../services/pushNotifications';
import { getCacheStatus, clearCache, cacheQuestions } from '../../services/offlineCache';
import { fetchQuestions } from '../../services/questionService';
import { Timestamp } from 'firebase/firestore';
import clsx from 'clsx';

// Types
interface CPASection {
  name: string;
  shortName: string;
  color: string;
  description: string;
}

interface UserProfile {
  displayName?: string;
  photoURL?: string;
  examSection?: string;
  dailyGoal?: number;
  examDate?: Timestamp | Date | string;
  [key: string]: any;
}

// Helper to convert various date formats to YYYY-MM-DD string
const formatDateForInput = (date: Timestamp | Date | string | undefined): string => {
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
  const { courseId } = useCourse();
  // const { } = useTheme(); // darkMode, toggleDarkMode unused in logic for now, only importing hooks
  // const { startTour, resetTour } = useTour();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cast profile
  const profile = userProfile as UserProfile | null;

  // Form states
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [examSection, setExamSection] = useState(profile?.examSection || 'REG');
  const [dailyGoal, setDailyGoal] = useState(profile?.dailyGoal || 50);
  const [examDate, setExamDate] = useState(formatDateForInput(profile?.examDate));

  // Sync form state when profile changes (e.g., after reset)
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setExamSection(profile.examSection || 'REG');
      setDailyGoal(profile.dailyGoal || 50);
      setExamDate(formatDateForInput(profile.examDate));
    }
  }, [profile]);
  
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    streakReminder: true,
    newContent: false,
  });

  // New states for enhanced settings
  // const [notificationPermission, setNotificationPermission] = useState('default');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [cacheStatus, setCacheStatus] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
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
      setNotifications((prev) => ({ ...prev, weeklyReport: profile.weeklyReportEnabled }));
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
      const section = (profile?.examSection || 'REG') as any;
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
      // Save profile settings
      await updateUserProfile({
        displayName,
        examSection,
        dailyGoal,
        examDate: examDate ? new Date(examDate) : null,
        dailyReminderEnabled: notifications.dailyReminder,
        dailyReminderTime: reminderTime || '09:00',
        weeklyReportEnabled: notifications.weeklyReport,
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
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      logger.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: Tab[] = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'study', label: 'Study Plan', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'Feedback & Support', icon: MessageSquare },
    { id: 'offline', label: 'Offline', icon: Wifi },
    { id: 'account', label: 'Account', icon: Shield },
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-56 flex-shrink-0">
          <nav 
            className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
            {...tabListProps}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
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
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                        {profile?.photoURL ? (
                          <img src={profile.photoURL} alt="" className="w-16 h-16 rounded-full object-cover" />
                        ) : (
                          <span className="text-2xl font-bold text-primary-600">
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
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="btn-secondary text-sm flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        {isUploadingPhoto ? 'Uploading...' : 'Change Photo'}
                      </button>
                      <p className="text-xs text-slate-500 mt-1">Max 5MB, JPG/PNG</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
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
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Study Plan Settings</h2>

                  {/* Exam Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Exam Section
                    </label>
                    {(() => {
                      // Determine available sections based on user's exam date
                      const BLUEPRINT_CUTOFF = new Date('2026-07-01');
                      const userExamDate = examDate ? new Date(examDate) : new Date();
                      const is2025Blueprint = userExamDate < BLUEPRINT_CUTOFF;
                      const availableSections = is2025Blueprint
                        ? [...CORE_SECTIONS, 'BEC']
                        : [...CORE_SECTIONS, ...DISCIPLINE_SECTIONS_2026];
                      
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {Object.entries(CPA_SECTIONS)
                            .filter(([key]) => availableSections.includes(key))
                            .map(([key, section]) => (
                            <button
                              key={key}
                              onClick={() => setExamSection(key)}
                              className={clsx(
                                'p-3 rounded-xl border-2 text-left transition-all',
                                examSection === key
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-slate-200 hover:border-primary-300'
                              )}
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs mb-2"
                                style={{ backgroundColor: (section as CPASection).color }}
                              >
                                {(section as CPASection).shortName}
                              </div>
                              <div className="text-sm font-medium text-slate-900">
                                {(section as CPASection).shortName}
                              </div>
                            </button>
                          ))}
                        </div>
                      );
                    })()}
                    
                    {/* Blueprint Info Note */}
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex gap-2">
                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          {isBefore2026Blueprint() ? (
                            <>
                              <strong>2025 vs 2026 Blueprint:</strong> BEC is available through June 30, 2026. 
                              Starting July 1, 2026, choose BAR, ISC, or TCP as your discipline section. 
                              REG and TCP will also have significant tax law updates (OBBBA) after July 1.
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
                  </div>

                  {/* Exam Date */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Target Exam Date
                    </label>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {/* Daily Goal */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-slate-200 hover:border-primary-300'
                          )}
                        >
                          <div className="text-lg font-bold text-primary-600">{preset.points} pts</div>
                          <div className="text-xs text-slate-500">{preset.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Offline Tab */}
            {activeTab === 'offline' && (
              <div className="card-body space-y-6">
                 <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Offline Storage</h2>
                    <p className="text-slate-600 mb-4">
                      Download questions for your exam section to study without an internet connection.
                    </p>
                    
                    {/* Download Section */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                      <h3 className="font-medium text-blue-900 mb-2">Download for Offline Study</h3>
                      <p className="text-sm text-blue-700 mb-4">
                        Download up to 500 {profile?.examSection || 'REG'} questions to practice anywhere, anytime.
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
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                      <h3 className="font-medium text-slate-900 mb-3">Current Cache</h3>
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-slate-600">Questions Cached</span>
                         <span className="font-bold text-slate-900">{cacheStatus?.questions_count || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-slate-500">Last Updated</span>
                         <span className="text-slate-500">
                           {cacheStatus?.questions_cached_at ? new Date(cacheStatus.questions_cached_at).toLocaleDateString() : 'Never'}
                         </span>
                      </div>
                    </div>

                    {/* Clear Cache */}
                    {(cacheStatus?.questions_count > 0) && (
                      <button
                        onClick={handleClearCache}
                        className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        Clear Offline Cache
                      </button>
                    )}
                 </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900">Daily Study Reminder</div>
                        <div className="text-sm text-slate-500">Get a notification to maintain your streak</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.dailyReminder}
                          onChange={(e) => setNotifications(prev => ({ ...prev, dailyReminder: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    {notifications.dailyReminder && (
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl ml-4">
                        <div className="font-medium text-slate-900">Reminder Time</div>
                        <input
                          type="time"
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900">Weekly Progress Report</div>
                        <div className="text-sm text-slate-500">Email summary of your study performance (coming soon)</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReport}
                          onChange={(e) => setNotifications(prev => ({ ...prev, weeklyReport: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
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
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Feedback & Support</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <h3 className="font-medium text-blue-900 mb-2">Have a suggestion?</h3>
                      <p className="text-sm text-blue-700 mb-4">
                        We value your input! Let us know how we can make VoraPrep better for you.
                      </p>
                      <a 
                        href="mailto:support@voraprep.com?subject=VoraPrep%20Feedback"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Send Feedback
                      </a>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="font-medium text-slate-900 mb-2">Report an Issue</h3>
                      <p className="text-sm text-slate-600 mb-4">
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
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Management</h2>
                  
                  <div className="space-y-6">
                    {/* Account Info */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            User ID
                          </div>
                          <div className="text-sm font-mono text-slate-700 truncate">
                            {user?.uid}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Email
                          </div>
                          <div className="text-sm text-slate-700">
                            {user?.email}
                          </div>
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Account Created
                           </div>
                           <div className="text-sm text-slate-700">
                             {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                           </div>
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                            Last Login
                           </div>
                           <div className="text-sm text-slate-700">
                             {user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Just now'}
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6"></div>

                    <h3 className="font-medium text-slate-900 mb-3">Linked Accounts</h3>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shrink-0">
                             <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                             </svg>
                           </div>
                           <div>
                             <div className="font-medium text-slate-900">Google Account</div>
                             <div className="text-sm text-slate-500">
                               {user?.providerData?.some(p => p.providerId === 'google.com') 
                                 ? 'Connected' 
                                 : 'Not connected'}
                             </div>
                           </div>
                         </div>
                         {user?.providerData?.some(p => p.providerId === 'google.com') ? (
                           <button 
                             onClick={handleUnlinkGoogle}
                             className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                           >
                             Disconnect
                           </button>
                         ) : (
                           <button 
                             onClick={handleLinkGoogle}
                             className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                           >
                             Connect
                           </button>
                         )}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6"></div>

                    {/* Actions */}
                    <h3 className="font-medium text-slate-900 mb-3">Security & Session</h3>
                    <div className="space-y-3">
                      <button
                        onClick={async () => {
                          try {
                            await resetPassword(user?.email || '');
                            alert('Password reset email sent! Check your inbox.');
                          } catch (err) {
                            alert('Failed to send reset email. Please try again.');
                          }
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        Change Password
                      </button>
                      <button
                        onClick={() => signOut()}
                        className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button - only show on tabs with saveable settings */}
            {['profile', 'study', 'notifications'].includes(activeTab) && (
              <div className="p-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                {saveSuccess && (
                    <div className="ml-4 flex items-center text-green-600 animate-fade-in">
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
  );
};

export default Settings;
