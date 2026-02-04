import React, { useState } from 'react';
import logger from '../../utils/logger';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Target,
  Clock,
  BookOpen,
  Sparkles,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { CPA_SECTIONS, DAILY_GOAL_PRESETS, CORE_SECTIONS, DISCIPLINE_SECTIONS_2026 } from '../../config/examConfig';
import { scrollToTop } from '../../utils/scroll';
import clsx from 'clsx';

// Types
interface Step {
  id: string;
  title: string;
}

const STEPS: Step[] = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'exam-date', title: 'Exam Date' },
  { id: 'section', title: 'Choose Section' },
  { id: 'daily-goal', title: 'Daily Goal' },
  { id: 'complete', title: 'All Set!' },
];

interface CPASection {
  name: string;
  shortName: string;
  color: string;
  description: string;
}

// Sub-component props
interface SectionStepProps {
  selected: string;
  onSelect: (id: string) => void;
  examDate: string;
}

interface ExamDateStepProps {
  value: string;
  onChange: (val: string) => void;
}

interface DailyGoalStepProps {
  goal: number;
  onGoalChange: (goal: number) => void;
  plan: string;
  onPlanChange: (plan: string) => void;
}

interface CompleteStepProps {
  section: string;
  examDate: string;
  dailyGoal: number;
}


// Step Components
const WelcomeStep: React.FC = () => (
  <div className="text-center">
    <img 
      src="/logo-icon.svg" 
      alt="VoraPrep" 
      className="w-20 h-20 mx-auto mb-6"
    />
    <h1 className="text-2xl font-bold text-slate-900 mb-3">Welcome to VoraPrep! 🎉</h1>
    <p className="text-slate-600 mb-6">
      You're about to start your journey to becoming a CPA. Let's set up your personalized study
      plan in just a few steps.
    </p>
    <div className="bg-primary-50 rounded-xl p-4 text-left">
      <h3 className="font-semibold text-primary-900 mb-2">What we'll cover:</h3>
      <ul className="space-y-2 text-sm text-primary-700">
        <li className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Your target exam date
        </li>
        <li className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Which exam section you're preparing for
        </li>
        <li className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Your daily study goals
        </li>
      </ul>
    </div>
  </div>
);

const SectionStep: React.FC<SectionStepProps> = ({ selected, onSelect, examDate }) => {
  // Determine which blueprint applies based on exam date
  const BLUEPRINT_CUTOFF = new Date('2026-07-01');
  const examDateObj = examDate ? new Date(examDate) : new Date();
  const is2025Blueprint = examDateObj < BLUEPRINT_CUTOFF;
  
  // Filter sections based on blueprint
  // 2025 Blueprint (before July 1, 2026): AUD, FAR, REG + BEC
  // 2026 Blueprint (on/after July 1, 2026): AUD, FAR, REG + BAR, ISC, TCP
  const availableSections = is2025Blueprint
    ? [...CORE_SECTIONS, 'BEC']
    : [...CORE_SECTIONS, ...DISCIPLINE_SECTIONS_2026];

  return (
  <div>
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-6 h-6 text-primary-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">Choose Your Section</h2>
      <p className="text-slate-600 mt-2">Which CPA exam section are you studying for?</p>
    </div>

    {/* Blueprint indicator */}
    <div className={clsx(
      'mb-4 px-4 py-2 rounded-lg text-sm text-center',
      is2025Blueprint ? 'bg-amber-50 text-amber-800' : 'bg-blue-50 text-blue-800'
    )}>
      {is2025Blueprint ? (
        <>📋 <strong>2025 Blueprint</strong> (exam before July 1, 2026)</>
      ) : (
        <>📋 <strong>2026 Blueprint</strong> (exam on/after July 1, 2026)</>
      )}
    </div>

    <div className="space-y-3">
      {Object.entries(CPA_SECTIONS)
        .filter(([key]) => availableSections.includes(key))
        .map(([key, section]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={clsx(
            'w-full p-4 rounded-xl border-2 text-left transition-all',
            selected === key
              ? 'border-primary-500 bg-primary-50'
              : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: (section as CPASection).color }}
            >
              {(section as CPASection).shortName}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900">{(section as CPASection).name}</h3>
              <p className="text-sm text-slate-600 mt-0.5 truncate">{(section as CPASection).description}</p>
            </div>
            {selected === key && <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />}
          </div>
        </button>
      ))}
    </div>

    {/* Note about changing sections */}
    <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
      <p className="text-xs text-slate-600 text-center">
        📝 Studying for multiple sections? You can switch your active section anytime in <strong>Settings</strong>.
      </p>
    </div>
  </div>
  );
};

const ExamDateStep: React.FC<ExamDateStepProps> = ({ value, onChange }) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  // Determine blueprint based on selected date
  const BLUEPRINT_CUTOFF = new Date('2026-07-01');
  const selectedDate = value ? new Date(value) : null;
  const is2025Blueprint = selectedDate && selectedDate < BLUEPRINT_CUTOFF;

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">When's Your Exam?</h2>
        <p className="text-slate-600 mt-2">This determines which exam sections are available to you</p>
      </div>

      {/* Why we're asking */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Why does this matter?</strong> The CPA exam changes on July 1, 2026. Before that date, you can take <strong>BEC</strong>. After that date, BEC is replaced by <strong>BAR, ISC, and TCP</strong> disciplines.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Target Exam Date</label>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={today}
          max={maxDateStr}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-lg"
        />
      </div>

      {/* Blueprint indicator */}
      {selectedDate && (
        <div className={clsx(
          'mb-4 px-4 py-3 rounded-xl text-sm',
          is2025Blueprint ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'
        )}>
          {is2025Blueprint ? (
            <div className="text-amber-800">
              <strong>✓ 2025 Blueprint</strong>
              <p className="mt-1 text-xs">Sections available: AUD, FAR, REG, or BEC</p>
            </div>
          ) : (
            <div className="text-green-800">
              <strong>✓ 2026 Blueprint</strong>
              <p className="mt-1 text-xs">Sections available: AUD, FAR, REG, or a Discipline (BAR, ISC, TCP)</p>
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-sm text-slate-600">
          <strong>Tip:</strong> Most candidates need 6-8 weeks to prepare. You can change this later in Settings.
        </p>
      </div>
    </div>
  );
};

const DailyGoalStep: React.FC<DailyGoalStepProps> = ({ goal, onGoalChange }) => (
  <div>
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Target className="w-6 h-6 text-primary-600" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">Set Your Daily Goal</h2>
      <p className="text-slate-600 mt-2">How many points do you want to earn each day?</p>
    </div>

    <div className="space-y-3 mb-6">
      {DAILY_GOAL_PRESETS.map((preset: any) => ( // Using any for imported config if not typed
        <button
          key={preset.points}
          onClick={() => onGoalChange(preset.points)}
          className={clsx(
            'w-full p-4 rounded-xl border-2 text-left transition-all',
            goal === preset.points
              ? 'border-primary-500 bg-primary-50'
              : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">{preset.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                <Clock className="w-4 h-4" />
                <span>{preset.time}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-600">{preset.points}</span>
              <span className="text-sm text-slate-600 ml-1">pts/day</span>
            </div>
          </div>
        </button>
      ))}
    </div>

    <div className="bg-slate-50 rounded-xl p-4">
      <h4 className="font-medium text-slate-900 mb-2">How points work:</h4>
      <ul className="space-y-1 text-sm text-slate-600">
        <li>• Complete a lesson: 5-15 points</li>
        <li>• Answer a question correctly: 2-4 points</li>
        <li>• Complete a simulation: 10-20 points</li>
      </ul>
    </div>
  </div>
);

const CompleteStep: React.FC<CompleteStepProps> = ({ section, examDate, dailyGoal }) => {
  const sectionInfo = section ? CPA_SECTIONS[section as keyof typeof CPA_SECTIONS] as CPASection : null;
  
  // Parse date string as local date (not UTC) to avoid timezone shift
  const formattedDate = examDate
    ? (() => {
        const [year, month, day] = examDate.split('-').map(Number);
        const localDate = new Date(year, month - 1, day); // month is 0-indexed
        return localDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      })()
    : '';
  // Cast DAILY_GOAL_PRESETS to any or type if accessible
  const goalPreset = (DAILY_GOAL_PRESETS as any[]).find((p) => p.points === dailyGoal);

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-success-600" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">You're All Set!</h2>
      <p className="text-slate-600 mb-6">Here's your personalized study plan:</p>

      <div className="bg-slate-50 rounded-xl p-4 text-left space-y-4 mb-6">
        {sectionInfo && (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: sectionInfo.color }}
            >
              {sectionInfo.shortName}
            </div>
            <div>
              <div className="text-sm text-slate-600">Section</div>
              <div className="font-medium text-slate-900">{sectionInfo.name}</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div className="text-sm text-slate-600">Exam Date</div>
            <div className="font-medium text-slate-900">{formattedDate}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-success-600" />
          </div>
          <div>
            <div className="text-sm text-slate-600">Daily Goal</div>
            <div className="font-medium text-slate-900">
              {dailyGoal} points ({goalPreset?.name || 'Custom'})
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600">
        You can adjust these settings anytime in your profile.
      </p>
    </div>
  );
};

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile } = useAuth(); // removed user as it was only used for userProfile check

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSection, setSelectedSection] = useState(userProfile?.examSection || '');
  const [examDate, setExamDate] = useState('');
  const [dailyGoal, setDailyGoal] = useState(50);
  const [studyPlan, setStudyPlan] = useState('balanced');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canContinue = () => {
    switch (STEPS[currentStep].id) {
      case 'welcome':
        return true;
      case 'section':
        return !!selectedSection;
      case 'exam-date':
        return !!examDate;
      case 'daily-goal':
        return dailyGoal > 0;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    } else {
      // Complete onboarding
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Parse date as local date to avoid timezone shift
      const [year, month, day] = examDate.split('-').map(Number);
      const localExamDate = new Date(year, month - 1, day);
      
      // Auto-detect user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
      
      await updateUserProfile({
        examSection: selectedSection,
        examDate: localExamDate,
        dailyGoal,
        studyPlanId: studyPlan,
        onboardingComplete: true,
        onboardingCompletedAt: new Date(),
        timezone: userTimezone,
      });
      navigate('/dashboard');
    } catch (error) {
      logger.error('Error completing onboarding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case 'welcome':
        return <WelcomeStep />;
      case 'exam-date':
        return <ExamDateStep value={examDate} onChange={setExamDate} />;
      case 'section':
        return <SectionStep selected={selectedSection} onSelect={setSelectedSection} examDate={examDate} />;
      case 'daily-goal':
        return (
          <DailyGoalStep
            goal={dailyGoal}
            onGoalChange={setDailyGoal}
            plan={studyPlan}
            onPlanChange={setStudyPlan}
          />
        );
      case 'complete':
        return <CompleteStep section={selectedSection} examDate={examDate} dailyGoal={dailyGoal} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex flex-col">
      {/* Progress Indicator */}
      <div className="p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex-1">
                <div
                  className={clsx(
                    'h-1 rounded-full transition-all duration-300',
                    index <= currentStep ? 'bg-white' : 'bg-white/30'
                  )}
                />
              </div>
            ))}
          </div>
          <p className="text-white/70 text-sm mt-2 text-center">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">{renderStep()}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors',
              currentStep === 0
                ? 'opacity-0 pointer-events-none'
                : 'bg-white/10 text-white hover:bg-white/20'
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canContinue() || isSubmitting}
            className={clsx(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-colors',
              canContinue() && !isSubmitting
                ? 'bg-white text-primary-600 hover:bg-white/90 shadow-lg'
                : 'bg-white/30 text-white cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : currentStep === STEPS.length - 1 ? (
              <>
                Let's Go!
                <Sparkles className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
