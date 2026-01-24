import { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Moon,
  Sun,
  Target,
  Calendar,
  BookOpen,
  Shield,
  LogOut,
  ChevronRight,
  Loader2,
  Check,
  Volume2,
  VolumeX,
  Smartphone,
  Wifi,
  WifiOff,
  Download,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../providers/ThemeProvider';
import { useTour } from '../OnboardingTour';
import { CPA_SECTIONS, DAILY_GOAL_PRESETS } from '../../config/examConfig';
import {
  requestNotificationPermission,
  getNotificationPermission,
  setupDailyReminder,
  getDailyReminderSettings,
} from '../../services/notifications';
import {
  isSoundEnabled,
  isHapticEnabled,
  setSoundEnabled,
  setHapticEnabled,
} from '../../services/feedback';
import { getCacheStatus, clearCache } from '../../services/offlineCache';
import clsx from 'clsx';

const Settings = () => {
  const { user, userProfile, signOut, updateUserProfile } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { startTour, resetTour } = useTour();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [examSection, setExamSection] = useState(userProfile?.examSection || 'REG');
  const [dailyGoal, setDailyGoal] = useState(userProfile?.dailyGoal || 50);
  const [examDate, setExamDate] = useState(
    userProfile?.examDate?.toDate?.()?.toISOString().split('T')[0] || ''
  );
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    streakReminder: true,
    newContent: false,
  });

  // New states for enhanced settings
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [hapticEnabled, setHapticEnabledState] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [cacheStatus, setCacheStatus] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Load settings on mount
  useEffect(() => {
    // Notification permission
    setNotificationPermission(getNotificationPermission());

    // Sound/haptic settings
    setSoundEnabledState(isSoundEnabled());
    setHapticEnabledState(isHapticEnabled());

    // Reminder settings
    const reminderSettings = getDailyReminderSettings();
    setReminderTime(reminderSettings.time);
    setNotifications((prev) => ({ ...prev, dailyReminder: reminderSettings.enabled }));

    // Cache status
    getCacheStatus().then(setCacheStatus);

    // Online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Request notification permission
  const handleRequestNotifications = async () => {
    const result = await requestNotificationPermission();
    setNotificationPermission(result.permission);
  };

  // Toggle sound
  const handleToggleSound = (enabled) => {
    setSoundEnabled(enabled);
    setSoundEnabledState(enabled);
  };

  // Toggle haptic
  const handleToggleHaptic = (enabled) => {
    setHapticEnabled(enabled);
    setHapticEnabledState(enabled);
  };

  // Update reminder settings
  const handleReminderChange = (key, value) => {
    if (key === 'dailyReminder') {
      setNotifications((prev) => ({ ...prev, dailyReminder: value }));
      setupDailyReminder(reminderTime, value);
    } else if (key === 'time') {
      setReminderTime(value);
      setupDailyReminder(value, notifications.dailyReminder);
    }
  };

  // Clear cache
  const handleClearCache = async () => {
    await clearCache();
    const status = await getCacheStatus();
    setCacheStatus(status);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile({
        displayName,
        examSection,
        dailyGoal,
        examDate: examDate ? new Date(examDate) : null,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'study', label: 'Study Plan', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'feedback', label: 'Feedback & Sound', icon: Volume2 },
    { id: 'offline', label: 'Offline', icon: Wifi },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-56 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
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
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      {userProfile?.photoURL ? (
                        <img src={userProfile.photoURL} alt="" className="w-16 h-16 rounded-full" />
                      ) : (
                        <span className="text-2xl font-bold text-primary-600">
                          {displayName?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <button className="btn-secondary text-sm">Change Photo</button>
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(CPA_SECTIONS).map(([key, section]) => (
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
                            style={{ backgroundColor: section.color }}
                          >
                            {section.shortName}
                          </div>
                          <div className="text-sm font-medium text-slate-900">
                            {section.shortName}
                          </div>
                        </button>
                      ))}
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
                      {DAILY_GOAL_PRESETS.map((preset) => (
                        <button
                          key={preset.points}
                          onClick={() => setDailyGoal(preset.points)}
                          className={clsx(
                            'p-3 rounded-xl border-2 text-center transition-all',
                            dailyGoal === preset.points
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-slate-200 hover:border-primary-300'
                          )}
                        >
                          <div className="text-xl font-bold text-slate-900">{preset.points}</div>
                          <div className="text-xs text-slate-500">{preset.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    Notification Preferences
                  </h2>

                  {/* Permission Request */}
                  {notificationPermission !== 'granted' && (
                    <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Bell className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-primary-900">Enable Notifications</div>
                          <div className="text-sm text-primary-700 mb-3">
                            Get reminders to stay on track with your CPA prep
                          </div>
                          <button
                            onClick={handleRequestNotifications}
                            className="btn-primary btn-sm"
                          >
                            Enable Notifications
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Daily Reminder Time */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-slate-900">Daily Study Reminder</div>
                        <div className="text-sm text-slate-500">Get reminded to study each day</div>
                      </div>
                      <button
                        onClick={() =>
                          handleReminderChange('dailyReminder', !notifications.dailyReminder)
                        }
                        className={clsx(
                          'w-12 h-7 rounded-full transition-colors relative',
                          notifications.dailyReminder ? 'bg-primary-500' : 'bg-slate-300'
                        )}
                      >
                        <span
                          className={clsx(
                            'absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform',
                            notifications.dailyReminder ? 'translate-x-6' : 'translate-x-1'
                          )}
                        />
                      </button>
                    </div>
                    {notifications.dailyReminder && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600">Remind me at:</span>
                        <input
                          type="time"
                          value={reminderTime}
                          onChange={(e) => handleReminderChange('time', e.target.value)}
                          className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: 'streakReminder',
                        label: 'Streak at Risk Alert',
                        desc: 'Warning when you might lose your streak',
                      },
                      {
                        key: 'weeklyReport',
                        label: 'Weekly Progress Report',
                        desc: 'Receive a summary of your progress',
                      },
                      {
                        key: 'newContent',
                        label: 'New Content Updates',
                        desc: 'Be notified when new lessons are added',
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                      >
                        <div>
                          <div className="font-medium text-slate-900">{item.label}</div>
                          <div className="text-sm text-slate-500">{item.desc}</div>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key],
                            }))
                          }
                          className={clsx(
                            'w-12 h-6 rounded-full transition-colors relative',
                            notifications[item.key] ? 'bg-primary-500' : 'bg-slate-300'
                          )}
                        >
                          <div
                            className={clsx(
                              'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow',
                              notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appearance */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-4">
                    Appearance
                  </h3>
                  <div
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                    data-tour="dark-mode"
                  >
                    <div className="flex items-center gap-3">
                      {darkMode ? (
                        <Moon className="w-5 h-5 text-primary-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-amber-500" />
                      )}
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          Dark Mode
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {darkMode ? 'On - easier on the eyes' : 'Off - classic light theme'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={clsx(
                        'w-12 h-6 rounded-full transition-colors relative',
                        darkMode ? 'bg-primary-500' : 'bg-slate-300'
                      )}
                    >
                      <div
                        className={clsx(
                          'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow',
                          darkMode ? 'translate-x-6' : 'translate-x-0.5'
                        )}
                      />
                    </button>
                  </div>
                </div>

                {/* Help & Tour */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-4">Help</h3>
                  <button
                    onClick={() => {
                      resetTour();
                      startTour();
                    }}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <div className="text-left">
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          App Tour
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Take a guided tour of all features
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Feedback & Sound Tab */}
            {activeTab === 'feedback' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Sound & Feedback</h2>

                  {/* Sound Effects */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        {soundEnabled ? (
                          <Volume2 className="w-5 h-5 text-primary-600" />
                        ) : (
                          <VolumeX className="w-5 h-5 text-slate-400" />
                        )}
                        <div>
                          <div className="font-medium text-slate-900">Sound Effects</div>
                          <div className="text-sm text-slate-500">
                            Play sounds for correct/incorrect answers
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleToggleSound}
                        className={clsx(
                          'w-12 h-6 rounded-full transition-colors relative',
                          soundEnabled ? 'bg-primary-500' : 'bg-slate-300'
                        )}
                      >
                        <div
                          className={clsx(
                            'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow',
                            soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          )}
                        />
                      </button>
                    </div>

                    {/* Haptic Feedback */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-slate-600" />
                        <div>
                          <div className="font-medium text-slate-900">Haptic Feedback</div>
                          <div className="text-sm text-slate-500">Vibration on mobile devices</div>
                        </div>
                      </div>
                      <button
                        onClick={handleToggleHaptic}
                        className={clsx(
                          'w-12 h-6 rounded-full transition-colors relative',
                          hapticEnabled ? 'bg-primary-500' : 'bg-slate-300'
                        )}
                      >
                        <div
                          className={clsx(
                            'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow',
                            hapticEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Keyboard Shortcuts Info */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-slate-900 mb-4">Keyboard Shortcuts</h3>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Select answer</span>
                        <kbd className="px-2 py-0.5 bg-white border rounded text-xs">1-4</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Submit</span>
                        <kbd className="px-2 py-0.5 bg-white border rounded text-xs">Enter</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Navigate</span>
                        <kbd className="px-2 py-0.5 bg-white border rounded text-xs">← →</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Flag question</span>
                        <kbd className="px-2 py-0.5 bg-white border rounded text-xs">F</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Offline Tab */}
            {activeTab === 'offline' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Offline Mode</h2>

                  {/* Connection Status */}
                  <div
                    className="mb-6 p-4 rounded-xl border-2"
                    style={{
                      backgroundColor: isOnline ? '#f0fdf4' : '#fef2f2',
                      borderColor: isOnline ? '#86efac' : '#fecaca',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isOnline ? (
                        <Wifi className="w-5 h-5 text-green-600" />
                      ) : (
                        <WifiOff className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <div
                          className="font-medium"
                          style={{ color: isOnline ? '#166534' : '#dc2626' }}
                        >
                          {isOnline ? 'Online' : 'Offline'}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: isOnline ? '#15803d' : '#b91c1c' }}
                        >
                          {isOnline ? 'You have internet connectivity' : 'Using cached content'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cache Status */}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-medium text-slate-900 mb-3">Cached Content</h3>

                    {cacheStatus ? (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">MCQ Questions</span>
                          <span className="font-medium text-slate-900">
                            {cacheStatus.questions || 0}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">TBS Simulations</span>
                          <span className="font-medium text-slate-900">{cacheStatus.tbs || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Last Synced</span>
                          <span className="font-medium text-slate-900">
                            {cacheStatus.lastSync
                              ? new Date(cacheStatus.lastSync).toLocaleDateString()
                              : 'Never'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No content cached yet</p>
                    )}
                  </div>
                </div>

                {/* Cache Actions */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-slate-900 mb-4">Cache Management</h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleClearCache}
                      className="w-full flex items-center justify-between p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-red-600">
                        <Download className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Clear Cache</div>
                          <div className="text-sm text-red-500">Remove all offline data</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Settings</h2>

                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-900">Change Password</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-900">Export Study Data</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-red-600 mb-4">Danger Zone</h3>
                  <div className="space-y-3">
                    <button
                      onClick={signOut}
                      className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-900">Sign Out</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                      <div className="flex items-center gap-3 text-red-600">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Delete Account</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            {(activeTab === 'profile' || activeTab === 'study') && (
              <div className="card-footer flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
