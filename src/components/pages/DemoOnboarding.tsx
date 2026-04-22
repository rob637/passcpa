/**
 * DemoOnboarding.tsx
 * 
 * A smooth, guided onboarding video for logged-in users who just signed up.
 * Shows the 3 main paths: Lessons, Practice Questions, Study Plan
 * Ends with actionable CTAs that navigate to those sections.
 * 
 * Features:
 * - Smooth crossfade transitions between scenes
 * - Actual lesson content (not just a list)
 * - Auto-advancing with manual controls
 * 
 * URL: /demo-onboarding
 * Used in: WelcomeVideoCard on Dashboard for first-time users
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Map,
  Target,
  CheckCircle,
  Clock,
  Flame,
  Play,
  Pause,
  SkipForward,
  Lightbulb,
  Brain,
  Zap,
  GraduationCap,
  ArrowRight,
  Calendar,
  TrendingUp,
  Layers,
  ListChecks,
  FileText,
} from 'lucide-react';
import clsx from 'clsx';

// ============================================================================
// Scene Types
// ============================================================================

type SceneId = 'welcome' | 'lessons' | 'practice' | 'studyplan' | 'choose';

interface Scene {
  id: SceneId;
  duration: number;
  title: string;
  icon: React.ElementType;
}

const SCENES: Scene[] = [
  { id: 'welcome', duration: 4000, title: 'Welcome', icon: GraduationCap },
  { id: 'lessons', duration: 7000, title: 'Lessons', icon: BookOpen },
  { id: 'practice', duration: 6000, title: 'Practice', icon: Target },
  { id: 'studyplan', duration: 5500, title: 'Study Plan', icon: Map },
  { id: 'choose', duration: 6000, title: 'Your Choice', icon: Zap },
];

// ============================================================================
// Scene Wrapper for Smooth Crossfade Transitions
// ============================================================================

interface SceneWrapperProps {
  isActive: boolean;
  children: React.ReactNode;
}

const SceneWrapper: React.FC<SceneWrapperProps> = ({ isActive, children }) => {
  return (
    <div
      className={clsx(
        'absolute inset-0 transition-all duration-700 ease-in-out',
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
      )}
    >
      {children}
    </div>
  );
};

// ============================================================================
// Scene Components
// ============================================================================

const WelcomeScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showPaths, setShowPaths] = useState(false);

  useEffect(() => {
    if (active) {
      setShowTitle(false);
      setShowSubtitle(false);
      setShowPaths(false);
      setTimeout(() => setShowTitle(true), 300);
      setTimeout(() => setShowSubtitle(true), 900);
      setTimeout(() => setShowPaths(true), 1600);
    }
  }, [active]);

  const paths = [
    { icon: BookOpen, label: 'Learn Concepts', color: 'text-emerald-500' },
    { icon: Target, label: 'Practice Questions', color: 'text-primary-500' },
    { icon: Map, label: 'Build Your Plan', color: 'text-purple-500' },
  ];

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 via-primary-50 to-indigo-50 dark:from-slate-900 dark:via-primary-900/20 dark:to-indigo-900/20">
      <div className="text-center px-8">
        <div className={clsx(
          'transition-all duration-700 transform',
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}>
          <div className="inline-flex items-center gap-3 mb-4 px-5 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="text-primary-700 dark:text-primary-300 font-medium">Welcome to VoraPrep!</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Let's Get You to <span className="text-primary-600">75+</span>
          </h1>
        </div>
        
        <p className={clsx(
          'text-xl text-slate-600 dark:text-slate-400 mb-10 transition-all duration-700 delay-200',
          showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          Here are 3 ways to start your CPA journey
        </p>

        <div className={clsx(
          'flex items-center justify-center gap-8 transition-all duration-700 delay-500',
          showPaths ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {paths.map((path) => (
            <div 
              key={path.label}
              className="flex flex-col items-center gap-3"
            >
              <div className={clsx(
                'w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center',
                'transform hover:scale-110 transition-transform'
              )}>
                <path.icon className={clsx('w-8 h-8', path.color)} />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{path.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Actual Lesson Content Scene (not just a list)
const LessonsScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [phase, setPhase] = useState<'intro' | 'content' | 'mnemonic' | 'quiz'>('intro');
  
  useEffect(() => {
    if (active) {
      setPhase('intro');
      setTimeout(() => setPhase('content'), 1500);
      setTimeout(() => setPhase('mnemonic'), 4000);
      setTimeout(() => setPhase('quiz'), 5500);
    }
  }, [active]);

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Top Navigation Bar (mini) */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs text-slate-500">FAR • Revenue Recognition</span>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">ASC 606 Five-Step Model</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>25 min</span>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="p-6 max-w-3xl mx-auto">
        {/* Intro */}
        <div className={clsx(
          'transition-all duration-700',
          phase !== 'intro' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            The 5-Step Revenue Recognition Model
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            ASC 606 provides a comprehensive framework for recognizing revenue. The core principle is that 
            revenue should be recognized when a company transfers goods or services to customers in an amount 
            that reflects the consideration expected.
          </p>
        </div>

        {/* Content - The 5 Steps */}
        <div className={clsx(
          'bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mb-6 transition-all duration-700',
          phase === 'content' || phase === 'mnemonic' || phase === 'quiz' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" />
            The Five Steps
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, text: 'Identify the contract with the customer' },
              { step: 2, text: 'Identify the performance obligations' },
              { step: 3, text: 'Determine the transaction price' },
              { step: 4, text: 'Allocate the price to performance obligations' },
              { step: 5, text: 'Recognize revenue when obligations are satisfied' },
            ].map((item, i) => (
              <div 
                key={item.step}
                className={clsx(
                  'flex items-center gap-3 p-3 rounded-lg transition-all duration-500',
                  (phase === 'content' || phase === 'mnemonic' || phase === 'quiz') ? 'bg-slate-50 dark:bg-slate-700/50' : 'bg-transparent'
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mnemonic Card */}
        <div className={clsx(
          'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 mb-6 transition-all duration-700',
          (phase === 'mnemonic' || phase === 'quiz') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        )}>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Memory Aid: "I.I.D.A.R."
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {['Identify', 'Identify', 'Determine', 'Allocate', 'Recognize'].map((word, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 rounded-lg font-bold text-sm bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100"
              >
                {word}
              </span>
            ))}
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-3">
            "I Identify Deals And Recognize" — each word maps to a step!
          </p>
        </div>

        {/* Quick Quiz Preview */}
        <div className={clsx(
          'bg-primary-50 dark:bg-primary-900/20 rounded-xl p-5 border border-primary-200 dark:border-primary-800 transition-all duration-700',
          phase === 'quiz' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Quick Check
          </h3>
          <p className="text-primary-700 dark:text-primary-300 mb-3">
            Which step involves breaking down the transaction price among multiple goods/services?
          </p>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-medium">
              Step 4: Allocate the price
            </span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PracticeScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showContent, setShowContent] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (active) {
      setShowContent(false);
      setShowAnswer(false);
      setSelectedOption(null);
      setTimeout(() => setShowContent(true), 300);
      setTimeout(() => setSelectedOption(1), 2200);
      setTimeout(() => setShowAnswer(true), 3500);
    }
  }, [active]);

  const options = [
    "When cash is received",
    "When performance obligation is satisfied",
    "When contract is signed",
    "At period end",
  ];

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 h-full overflow-hidden">
      {/* Header */}
      <div className={clsx(
        'flex items-center gap-4 mb-6 transition-all duration-500',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      )}>
        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <Target className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Practice Questions</h2>
          <p className="text-slate-500">9,000+ MCQs with instant explanations</p>
        </div>
      </div>

      {/* Question Card */}
      <div className={clsx(
        'bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-4 transition-all duration-700 delay-200',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            FAR • Revenue
          </span>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
            Medium
          </span>
        </div>
        <p className="text-lg text-slate-900 dark:text-white leading-relaxed">
          Under ASC 606, when is revenue recognized?
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {options.map((option, index) => {
          const isCorrect = index === 1;
          const isSelected = selectedOption === index;
          const reveal = showAnswer && isCorrect;

          return (
            <div
              key={index}
              className={clsx(
                'flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300',
                reveal && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
                !reveal && isSelected && 'border-primary-400 bg-primary-50 dark:bg-primary-900/20',
                !reveal && !isSelected && 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              )}
            >
              <span className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0',
                reveal && 'bg-emerald-500 text-white',
                !reveal && 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              )}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={clsx(
                'flex-1',
                reveal && 'text-emerald-700 dark:text-emerald-300 font-medium',
                !reveal && 'text-slate-700 dark:text-slate-300'
              )}>
                {option}
              </span>
              {reveal && <CheckCircle className="w-5 h-5 text-emerald-500" />}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {showAnswer && (
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Correct! +10 points</span>
          </div>
        </div>
      )}
    </div>
  );
};

const StudyPlanScene: React.FC<{ active: boolean }> = ({ active }) => {
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (active) {
      setShowContent(false);
      setStep(0);
      setTimeout(() => setShowContent(true), 300);
      setTimeout(() => setStep(1), 1200);
      setTimeout(() => setStep(2), 2400);
      setTimeout(() => setStep(3), 3600);
    }
  }, [active]);

  const steps = [
    { icon: Calendar, label: 'Set your exam date', detail: 'We work backwards from your goal' },
    { icon: Clock, label: 'Tell us your availability', detail: 'Weekday & weekend hours' },
    { icon: Layers, label: 'Choose your sections', detail: 'FAR, AUD, REG + discipline' },
    { icon: ListChecks, label: 'Get your daily plan', detail: 'AI-optimized study schedule' },
  ];

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 h-full overflow-hidden">
      {/* Header */}
      <div className={clsx(
        'flex items-center gap-4 mb-6 transition-all duration-500',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      )}>
        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <Map className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personalized Study Plan</h2>
          <p className="text-slate-500">Your roadmap to passing</p>
        </div>
      </div>

      {/* Setup Steps */}
      <div className={clsx(
        'bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-700 delay-200',
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-500" />
          Quick setup in 4 steps:
        </h3>
        
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                'flex items-start gap-4 p-4 rounded-xl transition-all duration-500',
                step > i && 'bg-emerald-50 dark:bg-emerald-900/20',
                step === i && 'bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-400',
                step < i && 'bg-slate-50 dark:bg-slate-700/50'
              )}
            >
              <div className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                step > i && 'bg-emerald-500 text-white',
                step === i && 'bg-purple-500 text-white',
                step < i && 'bg-slate-200 dark:bg-slate-600 text-slate-400'
              )}>
                {step > i ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className={clsx(
                  'font-medium',
                  step >= i ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                )}>
                  {s.label}
                </div>
                <div className={clsx(
                  'text-sm',
                  step >= i ? 'text-slate-500' : 'text-slate-300 dark:text-slate-600'
                )}>
                  {s.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Preview */}
      {step >= 3 && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium">
            <TrendingUp className="w-5 h-5" />
            Your plan adapts as you progress — no guesswork!
          </div>
        </div>
      )}
    </div>
  );
};

const ChooseScene: React.FC<{ active: boolean; onNavigate: (path: string) => void }> = ({ active, onNavigate }) => {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (active) {
      setShowContent(false);
      setShowButtons(false);
      setTimeout(() => setShowContent(true), 300);
      setTimeout(() => setShowButtons(true), 1000);
    }
  }, [active]);

  const paths = [
    { 
      icon: BookOpen, 
      label: 'Start a Lesson', 
      description: 'Learn key concepts',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      path: '/lessons'
    },
    { 
      icon: Target, 
      label: 'Practice Questions', 
      description: 'Test your knowledge',
      color: 'bg-primary-500 hover:bg-primary-600',
      path: '/practice'
    },
    { 
      icon: Map, 
      label: 'Create Study Plan', 
      description: 'Build your roadmap',
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/study-plan/setup'
    },
  ];

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-900 dark:via-slate-900 dark:to-primary-900/20">
      <div className="text-center px-8 max-w-2xl">
        <div className={clsx(
          'transition-all duration-700 transform',
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What would you like to do first?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Pick any path — you can always switch later
          </p>
        </div>

        <div className={clsx(
          'grid gap-4 transition-all duration-700 delay-300',
          showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {paths.map((item, i) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className={clsx(
                'flex items-center gap-4 p-5 rounded-xl text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02]',
                item.color
              )}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-lg">{item.label}</div>
                <div className="text-white/80 text-sm">{item.description}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>
          ))}
        </div>

        <p className={clsx(
          'mt-8 text-sm text-slate-500 dark:text-slate-400 transition-all duration-700 delay-700',
          showButtons ? 'opacity-100' : 'opacity-0'
        )}>
          Tip: Most users start with a <strong>lesson</strong> or <strong>practice questions</strong>
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const DemoOnboarding: React.FC = () => {
  const navigate = useNavigate();
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
    
    const updateInterval = 50;
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += updateInterval;
      setProgress((elapsed / currentScene.duration) * 100);
    }, updateInterval);

    timerRef.current = setTimeout(() => {
      if (currentSceneIndex < SCENES.length - 1) {
        setCurrentSceneIndex(currentSceneIndex + 1);
      } else {
        setIsPlaying(false);
        if (progressRef.current) clearInterval(progressRef.current);
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
    setIsPlaying(true);
  };

  const restart = () => {
    setCurrentSceneIndex(0);
    setIsPlaying(true);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Main Content - All scenes rendered, smooth crossfade between them */}
      <div className="flex-1 relative overflow-hidden">
        <SceneWrapper isActive={currentSceneIndex === 0}>
          <WelcomeScene active={currentSceneIndex === 0} />
        </SceneWrapper>
        <SceneWrapper isActive={currentSceneIndex === 1}>
          <LessonsScene active={currentSceneIndex === 1} />
        </SceneWrapper>
        <SceneWrapper isActive={currentSceneIndex === 2}>
          <PracticeScene active={currentSceneIndex === 2} />
        </SceneWrapper>
        <SceneWrapper isActive={currentSceneIndex === 3}>
          <StudyPlanScene active={currentSceneIndex === 3} />
        </SceneWrapper>
        <SceneWrapper isActive={currentSceneIndex === 4}>
          <ChooseScene active={currentSceneIndex === 4} onNavigate={handleNavigate} />
        </SceneWrapper>
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
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  index === currentSceneIndex
                    ? 'bg-primary-500 text-white'
                    : index < currentSceneIndex
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                )}
              >
                <scene.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{scene.title}</span>
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

        <p className="text-center text-slate-500 text-xs mt-3">
          🎬 Onboarding Demo — Smooth transitions between scenes
        </p>
      </div>
    </div>
  );
};

export default DemoOnboarding;
