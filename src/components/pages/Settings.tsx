import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Bell,
  Target,
  Shield,
  Volume2,
  Wifi,
  LucideIcon,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
// import { useTheme } from '../../providers/ThemeProvider';
// import { useTour } from '../OnboardingTour'; // Not migrated yet
import { CPA_SECTIONS, DAILY_GOAL_PRESETS } from '../../config/examConfig';
import {
  getDailyReminderSettings,
} from '../../services/notifications';
import { getCacheStatus, clearCache } from '../../services/offlineCache';
import { Timestamp } from 'firebase/firestore';
import clsx from 'clsx';

// Types
interface CPASection {
  name: string;
  shortName: string;
  color: string;
  description: string;
}
interface DailyGoalPreset {
  name: string;
  points: number;
  time: string;
}

interface UserProfile {
  displayName?: string;
  photoURL?: string;
  examSection?: string;
  dailyGoal?: number;
  examDate?: Timestamp;
  [key: string]: any;
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const Settings: React.FC = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  // const { } = useTheme(); // darkMode, toggleDarkMode unused in logic for now, only importing hooks
  // const { startTour, resetTour } = useTour();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Cast profile
  const profile = userProfile as UserProfile | null;

  // Form states
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [examSection, setExamSection] = useState(profile?.examSection || 'REG');
  const [dailyGoal, setDailyGoal] = useState(profile?.dailyGoal || 50);
  const [examDate, setExamDate] = useState(
    profile?.examDate?.toDate?.()?.toISOString().split('T')[0] || ''
  );
  
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
  
  // Load settings on mount
  useEffect(() => {
    // Reminder settings
    const reminderSettings = getDailyReminderSettings();
    setReminderTime(reminderSettings.time);
    setNotifications((prev) => ({ ...prev, dailyReminder: reminderSettings.enabled }));

    // Cache status
    getCacheStatus().then(setCacheStatus);
  }, []);

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
      });      // Update reminder settings
      const time = reminderTime || '09:00'; // Access reminderTime to shut up TS
      void time;
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: Tab[] = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
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
                      {profile?.photoURL ? (
                        <img src={profile.photoURL} alt="" className="w-16 h-16 rounded-full" />
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
                      Manage your offline content. Caching lessons allows you to study without an internet connection.
                    </p>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                      <div className="flex items-center justify-between mb-2">
                         <span className="font-medium text-slate-700">Questions Cached</span>
                         <span className="font-bold text-slate-900">{cacheStatus?.questions_count || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-slate-500">Last Updated</span>
                         <span className="text-slate-500">
                           {cacheStatus?.questions_cached_at ? new Date(cacheStatus.questions_cached_at).toLocaleDateString() : 'Never'}
                         </span>
                      </div>
                    </div>

                    <button
                      onClick={handleClearCache}
                      className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                    >
                      Clear Offline Cache
                    </button>
                 </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="p-6 border-t border-slate-100 flex justify-end">
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
