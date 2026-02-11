import React, { useState, useEffect } from 'react';
import logger from '../../utils/logger';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { trackEvent } from '../../services/analytics';
import { getCourseHomePath } from '../../utils/courseNavigation';
import { useCourse } from '../../providers/CourseProvider';
import { createExamDateUpdate, createStudyPlanUpdate } from '../../utils/profileHelpers';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Target,
  Clock,
  BookOpen,
  Sparkles,
  CheckCircle,
  GraduationCap,
  Calculator,
  FileText,
  BarChart3,
  Search,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { DAILY_GOAL_PRESETS, CORE_SECTIONS, DISCIPLINE_SECTIONS_2026 } from '../../config/examConfig';
import { getSectionDisplayInfo } from '../../utils/sectionUtils';
import { COURSES, ACTIVE_COURSES } from '../../courses';
import { CourseId } from '../../types/course';
import { scrollToTop } from '../../utils/scroll';
import clsx from 'clsx';

// Types
interface Step {
  id: string;
  title: string;
}

// Single-exam courses: these exams test all domains in one sitting
// Users don't pick a section - they study for the whole exam
const SINGLE_EXAM_COURSES: CourseId[] = ['cfp', 'cisa'];

const isSingleExamCourse = (courseId: string): boolean => 
  SINGLE_EXAM_COURSES.includes(courseId as CourseId);

// Get steps based on course type and whether switching (skips course selection when switching)
const getStepsForCourse = (courseId: string, isCourseSwitching: boolean = false): Step[] => {
  const baseSteps: Step[] = [
    { id: 'welcome', title: 'Welcome' },
  ];
  
  // Skip course selection when switching to a new course (they already chose it)
  if (!isCourseSwitching) {
    baseSteps.push({ id: 'course', title: 'Certification' });
  }
  
  baseSteps.push({ id: 'exam-date', title: 'Exam Date' });
  
  // Single-exam courses skip section selection
  if (!isSingleExamCourse(courseId)) {
    baseSteps.push({ id: 'section', title: 'Choose Section' });
  }
  
  baseSteps.push(
    { id: 'daily-goal', title: 'Daily Goal' },
    { id: 'complete', title: 'All Set!' }
  );
  
  return baseSteps;
};

// Sub-component props
interface SectionStepProps {
  selected: string;
  onSelect: (id: string) => void;
  examDate: string;
  courseId: string;
}

interface ExamDateStepProps {
  value: string;
  onChange: (val: string) => void;
  courseId: string;
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
  courseId: string;
}


// Step Components
interface WelcomeStepProps {
  courseId?: CourseId | '';
  isCourseSwitching: boolean;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ courseId, isCourseSwitching }) => {
  const course = courseId ? COURSES[courseId] : null;
  
  if (isCourseSwitching && course) {
    // Course-specific welcome when switching exams
    return (
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
          <GraduationCap className="w-10 h-10 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Welcome to {course.shortName} Prep! 🎉
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Let's set up your {course.shortName} study plan in just a few steps.
        </p>
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 text-left">
          <h3 className="font-semibold text-primary-900 dark:text-primary-300 mb-2">About {course.shortName}:</h3>
          <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-400">
            <li className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {course.sections.length} exam {course.sections.length === 1 ? 'part' : 'parts'}: {course.sections.map(s => s.shortName).join(', ')}
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Set your target exam date
            </li>
            <li className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Configure your daily study goals
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  // Default welcome for new users
  return (
    <div className="text-center">
      <img 
        src="/logo-icon.svg" 
        alt="VoraPrep" 
        className="w-20 h-20 mx-auto mb-6"
      />
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Welcome to VoraPrep! 🎉</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Let's set up your personalized study plan in just a few steps.
      </p>
      <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 text-left">
        <h3 className="font-semibold text-primary-900 dark:text-primary-300 mb-2">What we'll cover:</h3>
        <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-400">
          <li className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Which certification you're pursuing
          </li>
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
};

// Course icons mapping
const COURSE_ICONS: Record<string, React.ElementType> = {
  cpa: Calculator,
  ea: FileText,
  cma: BarChart3,
  cia: Search,
};

interface CourseStepProps {
  selected: CourseId | '';
  onSelect: (id: CourseId) => void;
}

const CourseStep: React.FC<CourseStepProps> = ({ selected, onSelect }) => (
  <div>
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
        <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Choose Your Certification</h2>
      <p className="text-slate-600 dark:text-slate-400 mt-2">Which professional certification are you preparing for?</p>
    </div>

    <div className="space-y-3">
      {ACTIVE_COURSES.map((courseId) => {
        const course = COURSES[courseId];
        if (!course) return null;
        const Icon = COURSE_ICONS[courseId] || GraduationCap;
        
        return (
          <button
            key={courseId}
            onClick={() => onSelect(courseId)}
            className={clsx(
              'w-full p-4 rounded-xl border-2 text-left transition-all',
              selected === courseId
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            )}
          >
            <div className="flex items-start gap-3">
              <div 
                className={clsx(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  selected === courseId ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{course.shortName}</span>
                  {selected === courseId && (
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{course.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {course.sections.length} exam parts • {course.sections.map(s => s.shortName).join(', ')}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const SectionStep: React.FC<SectionStepProps> = ({ selected, onSelect, examDate, courseId }) => {
  const course = COURSES[courseId as keyof typeof COURSES];
  const isCPA = courseId === 'cpa';
  
  // CPA-specific blueprint logic
  const BLUEPRINT_CUTOFF = new Date('2026-07-01');
  const examDateObj = examDate ? new Date(examDate) : new Date();
  const is2025Blueprint = examDateObj < BLUEPRINT_CUTOFF;
  
  // For CPA, filter sections based on blueprint
  // For other courses, show all sections
  let sections = course?.sections || [];
  if (isCPA) {
    const availableSectionIds = is2025Blueprint
      ? [...CORE_SECTIONS, ...DISCIPLINE_SECTIONS_2026]
      : [...CORE_SECTIONS, ...DISCIPLINE_SECTIONS_2026];
    sections = sections.filter(s => availableSectionIds.includes(s.id));
  }

  return (
  <div>
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Choose Your Section</h2>
      <p className="text-slate-600 dark:text-slate-400 mt-2">Which {course?.shortName || 'exam'} section are you studying for?</p>
    </div>

    {/* Blueprint indicator - CPA only */}
    {isCPA && (
      <div className={clsx(
        'mb-4 px-4 py-2 rounded-lg text-sm text-center',
        is2025Blueprint ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
      )}>
        {is2025Blueprint ? (
          <>📋 <strong>2025 Blueprint</strong> (exam before July 1, 2026)</>
        ) : (
          <>📋 <strong>2026 Blueprint</strong> (exam on/after July 1, 2026)</>
        )}
      </div>
    )}

    <div className="space-y-3">
      {sections.map((section) => {
        const sectionDisplay = getSectionDisplayInfo(section.id, courseId);
        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={clsx(
              'w-full p-4 rounded-xl border-2 text-left transition-all',
              selected === section.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: sectionDisplay?.color || '#6366f1' }}
              >
                {section.shortName}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white">{section.name}</h3>
                {section.weight && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Weight: {section.weight}</p>
                )}
              </div>
              {selected === section.id && <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />}
            </div>
          </button>
        );
      })}
    </div>

    {/* Note about changing sections */}
    <div className="mt-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3">
      <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
        📝 Studying for multiple sections? Switch anytime from the <strong>Home</strong> screen or in <strong>Settings</strong>.
      </p>
    </div>
  </div>
  );
};

const ExamDateStep: React.FC<ExamDateStepProps> = ({ value, onChange, courseId }) => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  // Get course info
  const course = COURSES[courseId as CourseId];
  const examName = course?.shortName || courseId?.toUpperCase() || 'exam';
  
  // CPA-specific: Determine blueprint based on selected date
  const BLUEPRINT_CUTOFF = new Date('2026-07-01');
  const selectedDate = value ? new Date(value) : null;
  const is2025Blueprint = selectedDate && selectedDate < BLUEPRINT_CUTOFF;
  const isCPA = courseId === 'cpa';
  
  // Get exam-specific info message
  const getExamInfoMessage = () => {
    switch (courseId) {
      case 'cpa':
        return 'The CPA exam blueprint changes on July 1, 2026. After that date, REG and TCP sections will include updated tax law provisions (OBBBA). Our content adapts automatically.';
      case 'ea':
        return 'The EA exam (SEE) is offered year-round at Prometric test centers. Each of the three parts can be taken in any order. Testing typically opens in May for the next year\'s content.';
      case 'cma':
        return 'The CMA exam has three testing windows: January-February, May-June, and September-October. Plan your study schedule around your target window.';
      case 'cia':
        return 'The CIA exam is offered year-round at Pearson VUE test centers. You can take the three parts in any order and must complete all parts within 3 years.';
      case 'cfp':
        return 'The CFP exam is offered three times per year: March, July, and November. The exam is a single 6-hour test covering all 8 principal knowledge domains.';
      case 'cisa':
        return 'The CISA exam is offered year-round at PSI testing centers worldwide. It\'s a single 4-hour exam covering all 5 domains.';
      default:
        return `Set your target exam date to help us create an optimal study plan for your ${examName} preparation.`;
    }
  };
  
  // Get exam-specific tip
  const getExamTip = () => {
    switch (courseId) {
      case 'cpa':
        return 'Most candidates need 6-8 weeks per section to prepare.';
      case 'ea':
        return 'Most candidates need 4-6 weeks per part to prepare.';
      case 'cma':
        return 'Most candidates need 150-200 study hours per part.';
      case 'cia':
        return 'Plan for 100-150 study hours per part.';
      case 'cfp':
        return 'Most candidates need 250-300 total study hours.';
      case 'cisa':
        return 'Most candidates need 100-150 total study hours.';
      default:
        return 'Set a realistic target to stay on track.';
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">When's Your {examName} Exam?</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">This helps us create an optimal study plan for you</p>
      </div>

      {/* Why we're asking - exam-specific */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Why does this matter?</strong> {getExamInfoMessage()}
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Exam Date</label>
        <div className="relative">
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={today}
            max={maxDateStr}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-base dark:[color-scheme:dark]"
          />
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Blueprint indicator - CPA only */}
      {isCPA && selectedDate && (
        <div className={clsx(
          'mb-4 px-4 py-3 rounded-xl text-sm',
          is2025Blueprint ? 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800' : 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
        )}>
          {is2025Blueprint ? (
            <div className="text-amber-800 dark:text-amber-300">
              <strong>✓ 2025 Blueprint</strong>
              <p className="mt-1 text-xs">Current tax law. Choose a discipline: BAR, ISC, or TCP</p>
            </div>
          ) : (
            <div className="text-green-800 dark:text-green-300">
              <strong>✓ 2026 Blueprint</strong>
              <p className="mt-1 text-xs">Sections available: AUD, FAR, REG, or a Discipline (BAR, ISC, TCP)</p>
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>Tip:</strong> {getExamTip()} You can change this later in Settings.
        </p>
      </div>
    </div>
  );
};

const DailyGoalStep: React.FC<DailyGoalStepProps> = ({ goal, onGoalChange }) => (
  <div>
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Set Your Daily Goal</h2>
      <p className="text-slate-600 dark:text-slate-400 mt-2">How many points do you want to earn each day?</p>
    </div>

    <div className="space-y-3 mb-6">
      {DAILY_GOAL_PRESETS.map((preset: any) => ( // Using any for imported config if not typed
        <button
          key={preset.points}
          onClick={() => onGoalChange(preset.points)}
          className={clsx(
            'w-full p-4 rounded-xl border-2 text-left transition-all',
            goal === preset.points
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{preset.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                <Clock className="w-4 h-4" />
                <span>{preset.time}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{preset.points}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">pts/day</span>
            </div>
          </div>
        </button>
      ))}
    </div>

    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
      <h4 className="font-medium text-slate-900 dark:text-white mb-2">How points work:</h4>
      <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <li>• Complete a lesson: 5-15 points</li>
        <li>• Answer a question correctly: 2-4 points</li>
        <li>• Complete a simulation: 10-20 points</li>
      </ul>
    </div>
  </div>
);

const CompleteStep: React.FC<CompleteStepProps> = ({ section, examDate, dailyGoal, courseId }) => {
  const sectionInfo = section ? getSectionDisplayInfo(section, courseId) : null;
  
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
      <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-success-600 dark:text-success-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">You're All Set!</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Here's your personalized study plan:</p>

      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-left space-y-4 mb-6">
        {sectionInfo && (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: sectionInfo.color }}
            >
              {sectionInfo.shortName}
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Section</div>
              <div className="font-medium text-slate-900 dark:text-white">{sectionInfo.name}</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Exam Date</div>
            <div className="font-medium text-slate-900 dark:text-white">{formattedDate}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-success-600 dark:text-success-400" />
          </div>
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Daily Goal</div>
            <div className="font-medium text-slate-900 dark:text-white">
              {dailyGoal} points ({goalPreset?.name || 'Custom'})
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        You can adjust these settings anytime from Home or Settings.
      </p>
    </div>
  );
};

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile } = useAuth();
  const { courseId: currentCourseId } = useCourse();

  // Detect if this is a course switch (user already completed onboarding for at least one course)
  // In this case, we pre-select the course and skip the course selection step
  const isCourseSwitching = Boolean(
    userProfile?.onboardingCompleted && 
    Object.values(userProfile.onboardingCompleted).some(v => v === true)
  ) || Boolean(userProfile?.onboardingComplete);

  // Check for pending course from registration flow or course-specific launch page
  // Priority: 1) localStorage pendingCourse, 2) CourseProvider courseId, 3) userProfile.activeCourse
  const getPendingCourse = (): CourseId | '' => {
    const pending = localStorage.getItem('pendingCourse');
    if (pending && ACTIVE_COURSES.includes(pending as CourseId)) {
      return pending as CourseId;
    }
    // Use the current course from CourseProvider (this handles course switching)
    if (currentCourseId) {
      return currentCourseId;
    }
    return (userProfile?.activeCourse as CourseId) || '';
  };
  
  // Check if course was pre-selected (from launch page or registration)
  // This should skip the course selection step
  const hadPendingCourse = Boolean(localStorage.getItem('pendingCourse'));

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseId | ''>(getPendingCourse());
  const [selectedSection, setSelectedSection] = useState('');
  const [examDate, setExamDate] = useState('');
  const [dailyGoal, setDailyGoal] = useState(50);
  const [studyPlan, setStudyPlan] = useState('balanced');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track if course was pre-determined (skip course selection step)
  const [skipCourseStep] = useState(isCourseSwitching || hadPendingCourse);

  // Dynamic steps based on course type and whether course was pre-selected
  const steps = getStepsForCourse(selectedCourse, skipCourseStep);

  // Auto-set section for single-exam courses (they study the whole exam)
  useEffect(() => {
    if (selectedCourse && isSingleExamCourse(selectedCourse)) {
      // For single-exam courses, set section to the course ID (uppercase)
      setSelectedSection(selectedCourse.toUpperCase());
    }
  }, [selectedCourse]);

  // Clear pending course from localStorage on mount
  useEffect(() => {
    localStorage.removeItem('pendingCourse');
  }, []);

  // Track onboarding step changes for funnel analytics
  useEffect(() => {
    const stepId = steps[currentStep]?.id;
    if (stepId) {
      trackEvent('onboarding_step', {
        step_number: currentStep + 1,
        step_id: stepId,
        step_name: steps[currentStep].title,
      });
    }
  }, [currentStep, steps]);

  const canContinue = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return true;
      case 'course':
        return !!selectedCourse;
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
    if (currentStep < steps.length - 1) {
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
      // Track onboarding completion
      trackEvent('onboarding_completed', {
        course: selectedCourse,
        section: selectedSection,
        daily_goal: dailyGoal,
        study_plan: studyPlan,
        days_until_exam: examDate ? Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null,
      });

      // Parse date as local date to avoid timezone shift
      const [year, month, day] = examDate.split('-').map(Number);
      const localExamDate = new Date(year, month - 1, day);
      
      // Auto-detect user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
      
      // Create multi-course aware profile updates
      // Pass selectedCourse so single-exam courses (CFP, CISA) use course ID as key
      const examDateUpdate = createExamDateUpdate(userProfile, selectedSection, localExamDate, selectedCourse as CourseId);
      const studyPlanUpdate = createStudyPlanUpdate(userProfile, selectedCourse as CourseId, studyPlan);
      
      // Create per-course onboarding status update
      const existingOnboarding = userProfile?.onboardingCompleted || {};
      const onboardingUpdate = {
        ...existingOnboarding,
        [selectedCourse]: true,
      };
      
      await updateUserProfile({
        activeCourse: selectedCourse as CourseId,
        examSection: selectedSection,
        ...examDateUpdate,
        dailyGoal,
        ...studyPlanUpdate,
        onboardingComplete: true, // Keep legacy flag for compatibility
        onboardingCompleted: onboardingUpdate, // New per-course tracking
        onboardingCompletedAt: new Date(),
        timezone: userTimezone,
      });
      
      // Check for pending checkout (user came from pricing page)
      const pendingCheckoutStr = localStorage.getItem('pendingCheckout');
      if (pendingCheckoutStr) {
        try {
          const pendingCheckout = JSON.parse(pendingCheckoutStr);
          localStorage.removeItem('pendingCheckout');
          // Navigate to start checkout page
          navigate(`/start-checkout?course=${pendingCheckout.course}&interval=${pendingCheckout.interval}`);
          return;
        } catch {
          // Invalid JSON, continue to dashboard
          localStorage.removeItem('pendingCheckout');
        }
      }
      
      // Navigate to appropriate dashboard based on selected course
      const courseDashboard = getCourseHomePath(selectedCourse as CourseId);
      navigate(courseDashboard);
    } catch (error) {
      logger.error('Error completing onboarding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return <WelcomeStep courseId={selectedCourse} isCourseSwitching={skipCourseStep} />;
      case 'course':
        return <CourseStep selected={selectedCourse} onSelect={setSelectedCourse} />;
      case 'exam-date':
        return <ExamDateStep value={examDate} onChange={setExamDate} courseId={selectedCourse} />;
      case 'section':
        return <SectionStep selected={selectedSection} onSelect={setSelectedSection} examDate={examDate} courseId={selectedCourse} />;
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
        return <CompleteStep section={selectedSection} examDate={examDate} dailyGoal={dailyGoal} courseId={selectedCourse} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-primary-600 to-primary-800 flex flex-col">
      {/* Progress Indicator */}
      <div className="p-4 safe-top">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
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
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">{renderStep()}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 safe-bottom">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            leftIcon={ChevronLeft}
            className={clsx(
              'px-6 py-3 text-white hover:bg-white/20',
              currentStep === 0 && 'opacity-0 pointer-events-none'
            )}
          >
            Back
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canContinue() || isSubmitting}
            loading={isSubmitting}
            rightIcon={currentStep === steps.length - 1 ? Sparkles : ChevronRight}
            className={clsx(
              'px-8 py-3 shadow-lg transition-all duration-200',
              canContinue() && !isSubmitting
                ? '!bg-white !text-primary-600 hover:!bg-primary-50 hover:shadow-xl hover:scale-[1.02] font-semibold'
                : '!bg-white/30 !text-white/70'
            )}
          >
            {isSubmitting ? 'Saving...' : currentStep === steps.length - 1 ? "Let's Go!" : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
