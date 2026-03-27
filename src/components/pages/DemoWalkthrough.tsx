/**
 * DemoWalkthrough.tsx
 * 
 * A self-contained demo page for recording the welcome video.
 * Shows 4 key screens with pre-populated mock data:
 * 1. Lessons - Browse & learn concepts
 * 2. Study Plan - Personalized roadmap
 * 3. Practice MCQs - Q&A with feedback
 * 4. Resources - Strategy & tips
 * 
 * URL: /demo-walkthrough
 * 
 * Usage: Open this page in a clean browser for screen recording.
 * Each tab shows a different feature with realistic mock data.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight,
  Lightbulb,
  Brain,
  FileText,
  BarChart3,
  Zap,
  Star,
} from 'lucide-react';
import clsx from 'clsx';

// ============================================================================
// Mock Data for Demo
// ============================================================================

const MOCK_LESSONS = [
  {
    id: 'far-rev-recognition',
    title: 'Revenue Recognition (ASC 606)',
    duration: 25,
    difficulty: 'medium' as const,
    completed: false,
    area: 'FAR-I',
    areaName: 'Financial Statements',
  },
  {
    id: 'far-inventory',
    title: 'Inventory Valuation Methods',
    duration: 20,
    difficulty: 'easy' as const,
    completed: true,
    area: 'FAR-I',
    areaName: 'Financial Statements',
  },
  {
    id: 'far-leases',
    title: 'Lease Accounting (ASC 842)',
    duration: 30,
    difficulty: 'hard' as const,
    completed: false,
    area: 'FAR-II',
    areaName: 'Select Transactions',
  },
  {
    id: 'far-ppe',
    title: 'Property, Plant & Equipment',
    duration: 22,
    difficulty: 'medium' as const,
    completed: true,
    area: 'FAR-II',
    areaName: 'Select Transactions',
  },
];

const MOCK_STUDY_PLAN = {
  examDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
  section: 'FAR',
  daysRemaining: 60,
  currentWeek: 2,
  totalWeeks: 10,
  health: 'on-track' as const,
  currentPhase: 'Foundation',
  weeklyTarget: { lessons: 5, mcqs: 150, tbs: 3 },
  completedThisWeek: { lessons: 3, mcqs: 87, tbs: 1 },
};

const MOCK_QUESTION = {
  id: 'far-demo-001',
  question: 'Under ASC 606, when should revenue be recognized for a contract with a customer?',
  options: [
    'When cash is received from the customer',
    'When the performance obligation is satisfied',
    'When the contract is signed',
    'At the end of each reporting period',
  ],
  correctAnswer: 1,
  explanation: `Revenue is recognized when (or as) a performance obligation is satisfied by transferring a promised good or service to a customer. The transfer occurs when the customer obtains control of the asset.

**Key Concept:** ASC 606 uses a 5-step model:
1. Identify the contract
2. Identify performance obligations
3. Determine transaction price
4. Allocate the transaction price
5. Recognize revenue when obligations are satisfied`,
  topic: 'Revenue Recognition',
  difficulty: 'medium',
};

const MOCK_RESOURCES = [
  { title: 'Exam Strategy Guide', icon: Target, count: 8, description: 'Master time management & question strategy' },
  { title: 'Quick Reference Sheets', icon: FileText, count: 12, description: 'Key formulas & rules at a glance' },
  { title: 'Mnemonics & Memory Aids', icon: Brain, count: 15, description: 'Remember complex topics easily' },
  { title: 'Exam Day Checklist', icon: CheckCircle, count: 1, description: 'Be fully prepared for test day' },
];

// ============================================================================
// Tab Components
// ============================================================================

type TabId = 'lessons' | 'study-plan' | 'practice' | 'resources';

interface TabButtonProps {
  id: TabId;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all',
      active
        ? 'bg-primary-600 text-white shadow-lg'
        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
    )}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

// ============================================================================
// 1. Lessons Tab
// ============================================================================

const LessonsDemo: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  const getDifficultyColor = (d: string) => {
    if (d === 'easy') return 'bg-green-100 text-green-700';
    if (d === 'hard') return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">FAR Lessons</h2>
          <p className="text-sm text-slate-500">4 lessons • 2 completed</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-full">
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">50% Complete</span>
        </div>
      </div>
      
      {/* Grouped by Area */}
      {['FAR-I', 'FAR-II'].map((areaId) => {
        const areaLessons = MOCK_LESSONS.filter(l => l.area === areaId);
        const areaName = areaLessons[0]?.areaName || areaId;
        return (
          <div key={areaId} className="mb-6">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
              {areaId}: {areaName}
            </h3>
            <div className="space-y-2">
              {areaLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id)}
                  className={clsx(
                    'w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left',
                    selectedLesson === lesson.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300'
                  )}
                >
                  <div className={clsx(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    lesson.completed 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-slate-100 dark:bg-slate-700'
                  )}>
                    {lesson.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {lesson.duration} min
                      </span>
                      <span className={clsx('px-2 py-0.5 rounded text-xs font-medium', getDifficultyColor(lesson.difficulty))}>
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        );
      })}
      
      {selectedLesson && (
        <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            ✓ Click any lesson to start learning. Lessons include text, examples, and practice checks.
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 2. Study Plan Tab
// ============================================================================

const StudyPlanDemo: React.FC = () => {
  const plan = MOCK_STUDY_PLAN;
  const progressPercent = Math.round((plan.completedThisWeek.mcqs / plan.weeklyTarget.mcqs) * 100);
  
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
          <Calendar className="w-6 h-6 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{plan.daysRemaining}</div>
          <div className="text-sm opacity-80">Days to Exam</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
          <Map className="w-6 h-6 mb-2 opacity-80" />
          <div className="text-2xl font-bold">Week {plan.currentWeek}</div>
          <div className="text-sm opacity-80">of {plan.totalWeeks}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-4 text-white">
          <Zap className="w-6 h-6 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{plan.currentPhase}</div>
          <div className="text-sm opacity-80">Current Phase</div>
        </div>
      </div>
      
      {/* Health Status */}
      <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <div>
          <span className="font-semibold text-green-700 dark:text-green-300">On Track!</span>
          <span className="text-sm text-green-600 dark:text-green-400 ml-2">You're keeping up with your study plan</span>
        </div>
      </div>
      
      {/* Weekly Progress */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">This Week's Progress</h3>
        
        <div className="space-y-4">
          {/* MCQs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary-500" />
                MCQs
              </span>
              <span className="text-sm text-slate-500">{plan.completedThisWeek.mcqs} / {plan.weeklyTarget.mcqs}</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          {/* Lessons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                Lessons
              </span>
              <span className="text-sm text-slate-500">{plan.completedThisWeek.lessons} / {plan.weeklyTarget.lessons}</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(plan.completedThisWeek.lessons / plan.weeklyTarget.lessons) * 100}%` }}
              />
            </div>
          </div>
          
          {/* TBS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-500" />
                Simulations
              </span>
              <span className="text-sm text-slate-500">{plan.completedThisWeek.tbs} / {plan.weeklyTarget.tbs}</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(plan.completedThisWeek.tbs / plan.weeklyTarget.tbs) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Week Preview */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Week {plan.currentWeek} Focus</h4>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Revenue Recognition deep dive
          </li>
          <li className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Inventory methods practice
          </li>
          <li className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Begin lease accounting intro
          </li>
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// 3. Practice MCQs Tab
// ============================================================================

const PracticeDemo: React.FC = () => {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const q = MOCK_QUESTION;
  
  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };
  
  const isCorrect = selected === q.correctAnswer;
  
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
            Question 1 of 10
          </span>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
            Medium
          </span>
        </div>
        <span className="text-sm text-slate-500">{q.topic}</span>
      </div>
      
      {/* Question */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <p className="text-lg text-slate-900 dark:text-white leading-relaxed">
          {q.question}
        </p>
      </div>
      
      {/* Options */}
      <div className="space-y-3">
        {q.options.map((option, index) => {
          const isThisCorrect = index === q.correctAnswer;
          const isSelected = index === selected;
          
          let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300';
          if (answered) {
            if (isThisCorrect) {
              optionStyle = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else if (isSelected && !isThisCorrect) {
              optionStyle = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            }
          } else if (isSelected) {
            optionStyle = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';
          }
          
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={clsx(
                'w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left',
                optionStyle
              )}
            >
              <span className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm',
                answered && isThisCorrect
                  ? 'bg-green-500 text-white'
                  : answered && isSelected && !isThisCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              )}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={clsx(
                'flex-1 pt-1',
                answered && isThisCorrect
                  ? 'text-green-700 dark:text-green-300 font-medium'
                  : answered && isSelected && !isThisCorrect
                    ? 'text-red-700 dark:text-red-300'
                    : 'text-slate-700 dark:text-slate-300'
              )}>
                {option}
              </span>
              {answered && isThisCorrect && (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Explanation */}
      {answered && (
        <div className={clsx(
          'rounded-xl p-5 border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
        )}>
          <div className="flex items-center gap-2 mb-3">
            {isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700 dark:text-green-300">Correct!</span>
              </>
            ) : (
              <>
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-700 dark:text-amber-300">Let's review this one</span>
              </>
            )}
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {q.explanation}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      {answered && (
        <div className="flex gap-3">
          <button
            onClick={() => { setAnswered(false); setSelected(null); }}
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            Try Again
          </button>
          <button className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
            Next Question
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {!answered && (
        <p className="text-center text-sm text-slate-500">
          Click an answer to see instant feedback
        </p>
      )}
    </div>
  );
};

// ============================================================================
// 4. Resources Tab
// ============================================================================

const ResourcesDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">CPA Resources</h2>
        <p className="text-sm text-slate-500">Study materials, strategy guides, and test-day tips</p>
      </div>
      
      {/* Resource Grid */}
      <div className="grid gap-4">
        {MOCK_RESOURCES.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <button
              key={index}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {resource.title}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-500">
                    {resource.count} {resource.count === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {resource.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
            </button>
          );
        })}
      </div>
      
      {/* Quick Tips Box */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-amber-800 dark:text-amber-200">Quick Exam Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Don't spend more than 2 minutes on any MCQ</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Flag difficult questions and return after completing easier ones</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Read all answer choices before selecting</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const DemoWalkthrough: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('lessons');
  
  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'study-plan', label: 'Study Plan', icon: Map },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'resources', label: 'Resources', icon: Compass },
  ];
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-icon.svg" alt="VoraPrep" className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">VoraPrep Demo</h1>
                <p className="text-xs text-slate-500">Video Recording Mode</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                FAR Section
              </span>
              <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-semibold">7 day streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {activeTab === 'lessons' && <LessonsDemo />}
        {activeTab === 'study-plan' && <StudyPlanDemo />}
        {activeTab === 'practice' && <PracticeDemo />}
        {activeTab === 'resources' && <ResourcesDemo />}
      </div>
      
      {/* Recording Instructions Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-3 text-center text-sm">
        <span className="opacity-70">Recording Mode:</span>{' '}
        <span className="font-medium">Click each tab to demonstrate the feature. Use FAR section with 7-day streak context.</span>
      </div>
    </div>
  );
};

export default DemoWalkthrough;
