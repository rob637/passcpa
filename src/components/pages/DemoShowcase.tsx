/**
 * DemoShowcase.tsx
 * 
 * A cinematic, auto-playing product demo for recording marketing videos.
 * Shows a "day in the life" of a VoraPrep user with:
 * - Animated counters and progress bars
 * - Confetti celebrations
 * - Smooth scene transitions
 * - Auto-advancing scenes (or manual control)
 * 
 * URL: /demo-showcase
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BookOpen,
  Map,
  Target,
  Compass,
  ChevronRight,
  CheckCircle,
  Clock,
  Calendar,
  Flame,
  Trophy,
  Play,
  Pause,
  SkipForward,
  ArrowRight,
  Lightbulb,
  Brain,
  FileText,
  BarChart3,
  Zap,
  Star,
  TrendingUp,
  Award,
  Sparkles,
  GraduationCap,
  Volume2,
  VolumeX,
} from 'lucide-react';
import clsx from 'clsx';
import { celebrateAchievement, celebrateStreak } from '../../utils/confetti';

// ============================================================================
// Animated Counter Hook
// ============================================================================

const useAnimatedCounter = (target: number, duration: number = 1500, delay: number = 0) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    setStarted(true);
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime - delay;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration, delay]);

  const reset = useCallback(() => {
    setValue(0);
    setStarted(false);
  }, []);

  return { value, start, reset, started };
};

// ============================================================================
// Animated Progress Bar
// ============================================================================

interface AnimatedProgressProps {
  target: number;
  color: string;
  delay?: number;
  duration?: number;
  active: boolean;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ 
  target, 
  color, 
  delay = 0, 
  duration = 1200,
  active 
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setWidth(target);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setWidth(0);
    }
  }, [active, target, delay]);

  return (
    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div
        className={clsx('h-full rounded-full transition-all ease-out', color)}
        style={{ 
          width: `${width}%`,
          transitionDuration: `${duration}ms`
        }}
      />
    </div>
  );
};

// ============================================================================
// Scene Types
// ============================================================================

type SceneId = 'intro' | 'dashboard' | 'practice' | 'result' | 'studyplan' | 'achievement' | 'outro';

interface Scene {
  id: SceneId;
  duration: number; // milliseconds
  title: string;
}

const SCENES: Scene[] = [
  { id: 'intro', duration: 3000, title: 'Welcome' },
  { id: 'dashboard', duration: 5000, title: 'Dashboard' },
  { id: 'practice', duration: 6000, title: 'Practice Session' },
  { id: 'result', duration: 4000, title: 'Results' },
  { id: 'studyplan', duration: 5000, title: 'Study Plan' },
  { id: 'achievement', duration: 4000, title: 'Achievement' },
  { id: 'outro', duration: 4000, title: 'Get Started' },
];

// ============================================================================
// Scene Components
// ============================================================================

const IntroScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    if (active) {
      setShowText(false);
      setShowSubtext(false);
      setTimeout(() => setShowText(true), 300);
      setTimeout(() => setShowSubtext(true), 800);
    }
  }, [active]);

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 via-primary-900 to-indigo-900">
      <div className="text-center">
        <div className={clsx(
          'transition-all duration-700 transform',
          showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <img src="/logo-icon.svg" alt="VoraPrep" className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">VoraPrep</h1>
        </div>
        <p className={clsx(
          'text-2xl text-primary-300 transition-all duration-700 delay-300',
          showSubtext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          AI-Powered Exam Prep That Gets You to 75+
        </p>
      </div>
    </div>
  );
};

const DashboardScene: React.FC<{ active: boolean }> = ({ active }) => {
  const streak = useAnimatedCounter(7, 1000, 500);
  const readiness = useAnimatedCounter(68, 1500, 800);
  const questions = useAnimatedCounter(342, 1200, 600);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (active) {
      streak.start();
      readiness.start();
      questions.start();
      setTimeout(() => setShowCards(true), 400);
    } else {
      streak.reset();
      readiness.reset();
      questions.reset();
      setShowCards(false);
    }
  }, [active]);

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 h-full overflow-hidden">
      {/* Header */}
      <div className={clsx(
        'flex items-center justify-between mb-8 transition-all duration-500',
        showCards ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      )}>
        <div className="flex items-center gap-4">
          <img src="/logo-icon.svg" alt="" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good morning, Sarah!</h1>
            <p className="text-slate-500">Let's make today count.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-amber-100 rounded-full">
          <Flame className="w-5 h-5 text-amber-600" />
          <span className="text-lg font-bold text-amber-700">{streak.value} day streak</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={clsx(
        'grid grid-cols-3 gap-6 mb-8 transition-all duration-700 delay-200',
        showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-xl">
          <Target className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-4xl font-bold">{readiness.value}%</div>
          <div className="text-primary-200">Exam Readiness</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <BookOpen className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-4xl font-bold">{questions.value}</div>
          <div className="text-emerald-200">Questions Practiced</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <Calendar className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-4xl font-bold">47</div>
          <div className="text-purple-200">Days to Exam</div>
        </div>
      </div>

      {/* Today's Plan */}
      <div className={clsx(
        'bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-700 delay-400',
        showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Today's Study Plan
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <div className="flex-1">
              <div className="font-medium text-slate-900 dark:text-white">Revenue Recognition Lesson</div>
              <div className="text-sm text-slate-500">25 min • Completed</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-2 border-primary-300">
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
              <Play className="w-3 h-3 text-white ml-0.5" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900 dark:text-white">Practice: 25 MCQs</div>
              <div className="text-sm text-slate-500">FAR • Up next</div>
            </div>
            <ChevronRight className="w-5 h-5 text-primary-500" />
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
            <div className="flex-1">
              <div className="font-medium text-slate-900 dark:text-white">Lease Accounting Lesson</div>
              <div className="text-sm text-slate-500">30 min • Scheduled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PracticeScene: React.FC<{ active: boolean; onCorrectAnswer: () => void }> = ({ active, onCorrectAnswer }) => {
  const [phase, setPhase] = useState<'question' | 'selecting' | 'correct'>('question');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (active) {
      setPhase('question');
      setSelectedOption(null);
      
      // Simulate user answering
      const timer1 = setTimeout(() => {
        setPhase('selecting');
        setSelectedOption(1); // Hover effect
      }, 2000);
      
      const timer2 = setTimeout(() => {
        setPhase('correct');
        onCorrectAnswer();
      }, 3500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [active, onCorrectAnswer]);

  const question = "Under ASC 606, when should revenue be recognized for a contract with a customer?";
  const options = [
    "When cash is received from the customer",
    "When the performance obligation is satisfied",
    "When the contract is signed",
    "At the end of each reporting period",
  ];

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold">
            Question 8 of 25
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm font-medium">
            Medium
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-4 h-4" />
          <span>1:23</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-6">
        <p className="text-xl text-slate-900 dark:text-white leading-relaxed">
          {question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isCorrect = index === 1;
          const isSelected = selectedOption === index;
          const showCorrect = phase === 'correct' && isCorrect;
          const showSelectedWrong = phase === 'correct' && isSelected && !isCorrect;

          return (
            <div
              key={index}
              className={clsx(
                'flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300',
                showCorrect && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-[1.02]',
                showSelectedWrong && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                !showCorrect && !showSelectedWrong && isSelected && phase === 'selecting' && 'border-primary-400 bg-primary-50 dark:bg-primary-900/20',
                !showCorrect && !showSelectedWrong && !isSelected && 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              )}
            >
              <span className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all duration-300',
                showCorrect && 'bg-emerald-500 text-white',
                showSelectedWrong && 'bg-red-500 text-white',
                !showCorrect && !showSelectedWrong && 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              )}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={clsx(
                'flex-1 pt-2 text-lg',
                showCorrect && 'text-emerald-700 dark:text-emerald-300 font-medium',
                showSelectedWrong && 'text-red-700 dark:text-red-300',
                !showCorrect && !showSelectedWrong && 'text-slate-700 dark:text-slate-300'
              )}>
                {option}
              </span>
              {showCorrect && <CheckCircle className="w-7 h-7 text-emerald-500 flex-shrink-0 mt-1" />}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {phase === 'correct' && (
        <div className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">Correct!</span>
            <span className="ml-auto text-emerald-600 font-semibold">+10 points</span>
          </div>
          <p className="text-emerald-700 dark:text-emerald-300">
            Revenue is recognized when a performance obligation is satisfied by transferring control of the promised good or service to the customer.
          </p>
        </div>
      )}
    </div>
  );
};

const ResultScene: React.FC<{ active: boolean }> = ({ active }) => {
  const score = useAnimatedCounter(84, 1500, 300);
  const correct = useAnimatedCounter(21, 1200, 500);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (active) {
      score.start();
      correct.start();
      setTimeout(() => setShowDetails(true), 800);
      setTimeout(() => celebrateAchievement(), 1200);
    } else {
      score.reset();
      correct.reset();
      setShowDetails(false);
    }
  }, [active]);

  return (
    <div className="p-8 bg-gradient-to-br from-emerald-50 to-primary-50 dark:from-emerald-900/20 dark:to-primary-900/20 h-full flex items-center justify-center">
      <div className="text-center max-w-lg">
        {/* Score Circle */}
        <div className={clsx(
          'relative w-48 h-48 mx-auto mb-8 transition-all duration-700',
          showDetails ? 'scale-100' : 'scale-75 opacity-0'
        )}>
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className="text-emerald-500 transition-all duration-1500 ease-out"
              style={{
                strokeDasharray: `${(score.value / 100) * 553} 553`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-emerald-600">{score.value}%</span>
            <span className="text-slate-500">Score</span>
          </div>
        </div>

        {/* Stats */}
        <div className={clsx(
          'grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-300',
          showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-emerald-600">{correct.value}</div>
            <div className="text-sm text-slate-500">Correct</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-red-500">4</div>
            <div className="text-sm text-slate-500">Incorrect</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold text-primary-600">18m</div>
            <div className="text-sm text-slate-500">Time</div>
          </div>
        </div>

        {/* Message */}
        <div className={clsx(
          'transition-all duration-700 delay-500',
          showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-emerald-600 mb-2">
            <Trophy className="w-6 h-6" />
            Excellent Work!
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            You're above the 80% benchmark. Keep this momentum going!
          </p>
        </div>
      </div>
    </div>
  );
};

const StudyPlanScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (active) {
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
    }
  }, [active]);

  const weeks = [
    { week: 1, phase: 'Foundation', complete: true },
    { week: 2, phase: 'Foundation', complete: true },
    { week: 3, phase: 'Building', complete: false, current: true },
    { week: 4, phase: 'Building', complete: false },
    { week: 5, phase: 'Reinforcement', complete: false },
    { week: 6, phase: 'Final Review', complete: false },
  ];

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 h-full">
      {/* Header */}
      <div className={clsx(
        'flex items-center justify-between mb-8 transition-all duration-500',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      )}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Map className="w-7 h-7 text-primary-500" />
            Your Study Roadmap
          </h1>
          <p className="text-slate-500">FAR Section • 47 days remaining</p>
        </div>
        <div className="px-4 py-2 bg-emerald-100 rounded-full flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-700">On Track</span>
        </div>
      </div>

      {/* Timeline */}
      <div className={clsx(
        'bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg mb-6 transition-all duration-700 delay-200',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <div className="flex items-center gap-2">
          {weeks.map((w, i) => (
            <React.Fragment key={w.week}>
              <div className={clsx(
                'flex-1 p-4 rounded-xl text-center transition-all duration-500',
                w.complete && 'bg-emerald-100 dark:bg-emerald-900/30',
                w.current && 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500',
                !w.complete && !w.current && 'bg-slate-100 dark:bg-slate-700'
              )} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={clsx(
                  'text-lg font-bold',
                  w.complete && 'text-emerald-600',
                  w.current && 'text-primary-600',
                  !w.complete && !w.current && 'text-slate-400'
                )}>
                  W{w.week}
                </div>
                <div className="text-xs text-slate-500 mt-1">{w.phase}</div>
                {w.complete && <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mt-2" />}
                {w.current && <div className="w-2 h-2 bg-primary-500 rounded-full mx-auto mt-2 animate-pulse" />}
              </div>
              {i < weeks.length - 1 && (
                <ChevronRight className={clsx(
                  'w-5 h-5 flex-shrink-0',
                  w.complete ? 'text-emerald-400' : 'text-slate-300'
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Week 3 Details */}
      <div className={clsx(
        'bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg transition-all duration-700 delay-400',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary-500" />
          Week 3: Building Phase
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">MCQs Progress</span>
              <span className="text-sm font-semibold text-primary-600">87 / 150</span>
            </div>
            <AnimatedProgress target={58} color="bg-primary-500" active={showContent} delay={600} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Lessons Completed</span>
              <span className="text-sm font-semibold text-emerald-600">4 / 5</span>
            </div>
            <AnimatedProgress target={80} color="bg-emerald-500" active={showContent} delay={800} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Simulations</span>
              <span className="text-sm font-semibold text-purple-600">1 / 3</span>
            </div>
            <AnimatedProgress target={33} color="bg-purple-500" active={showContent} delay={1000} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setShowAchievement(true);
        celebrateAchievement();
      }, 500);
    } else {
      setShowAchievement(false);
    }
  }, [active]);

  return (
    <div className="h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 flex items-center justify-center">
      <div className={clsx(
        'text-center transition-all duration-700 transform',
        showAchievement ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      )}>
        {/* Badge */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center">
            <Trophy className="w-20 h-20 text-white drop-shadow-lg" />
          </div>
          {/* Sparkles */}
          <Star className="absolute -top-2 -right-2 w-8 h-8 text-amber-400 animate-bounce" />
          <Star className="absolute -bottom-1 -left-3 w-6 h-6 text-orange-400 animate-bounce delay-100" />
          <Star className="absolute top-1/2 -right-4 w-5 h-5 text-yellow-400 animate-bounce delay-200" />
        </div>

        <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-2">
          Achievement Unlocked!
        </h1>
        <p className="text-xl text-amber-600 dark:text-amber-300 mb-4">
          Week Warrior
        </p>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Complete 7 consecutive days of studying. Your consistency is paying off!
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-amber-700">
          <Flame className="w-6 h-6" />
          <span className="text-2xl font-bold">7 Day Streak!</span>
        </div>
      </div>
    </div>
  );
};

const OutroScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (active) {
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
    }
  }, [active]);

  return (
    <div className="h-full bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700 flex items-center justify-center">
      <div className={clsx(
        'text-center text-white max-w-xl transition-all duration-700',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-90" />
        <h1 className="text-4xl font-bold mb-4">
          Your Path to 75+ Starts Here
        </h1>
        <p className="text-xl text-primary-200 mb-8">
          Join thousands of professionals who passed their exams with VoraPrep
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-transform cursor-pointer">
            Start Free Trial
          </div>
        </div>
        <p className="mt-6 text-primary-300 text-sm">
          14-day free trial • No credit card required
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const DemoShowcase: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const currentScene = SCENES[currentSceneIndex];

  const startSceneTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    
    // Progress bar update
    const updateInterval = 50;
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += updateInterval;
      setProgress((elapsed / currentScene.duration) * 100);
    }, updateInterval);

    // Scene transition
    timerRef.current = setTimeout(() => {
      if (currentSceneIndex < SCENES.length - 1) {
        setCurrentSceneIndex(currentSceneIndex + 1);
      } else {
        setIsPlaying(false);
      }
    }, currentScene.duration);
  }, [currentSceneIndex, currentScene.duration]);

  useEffect(() => {
    if (isPlaying) {
      startSceneTimer();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, currentSceneIndex, startSceneTimer]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextScene = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const goToScene = (index: number) => {
    setCurrentSceneIndex(index);
  };

  const restart = () => {
    setCurrentSceneIndex(0);
    setIsPlaying(true);
  };

  const handleCorrectAnswer = useCallback(() => {
    celebrateStreak(3);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {currentScene.id === 'intro' && <IntroScene active={currentScene.id === 'intro'} />}
        {currentScene.id === 'dashboard' && <DashboardScene active={currentScene.id === 'dashboard'} />}
        {currentScene.id === 'practice' && <PracticeScene active={currentScene.id === 'practice'} onCorrectAnswer={handleCorrectAnswer} />}
        {currentScene.id === 'result' && <ResultScene active={currentScene.id === 'result'} />}
        {currentScene.id === 'studyplan' && <StudyPlanScene active={currentScene.id === 'studyplan'} />}
        {currentScene.id === 'achievement' && <AchievementScene active={currentScene.id === 'achievement'} />}
        {currentScene.id === 'outro' && <OutroScene active={currentScene.id === 'outro'} />}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-4">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-700 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Scene Indicators */}
          <div className="flex items-center gap-2">
            {SCENES.map((scene, index) => (
              <button
                key={scene.id}
                onClick={() => goToScene(index)}
                className={clsx(
                  'px-3 py-1 rounded-full text-xs font-medium transition-all',
                  index === currentSceneIndex
                    ? 'bg-primary-500 text-white'
                    : index < currentSceneIndex
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                )}
              >
                {scene.title}
              </button>
            ))}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={nextScene}
              disabled={currentSceneIndex >= SCENES.length - 1}
              className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 flex items-center justify-center text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={restart}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
            >
              Restart
            </button>
          </div>
        </div>

        {/* Recording Tip */}
        <p className="text-center text-slate-500 text-xs mt-3">
          🎬 Recording Mode — Auto-advances through scenes. Click scene tabs or use controls to navigate manually.
        </p>
      </div>
    </div>
  );
};

export default DemoShowcase;
