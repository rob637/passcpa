/**
 * CFP Study Plan Setup Component
 * 
 * Allows users to set exam date and generate a personalized study plan
 * for the CFP certification exam.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

// CFP domains aligned with blueprint weights
const CFP_DOMAINS = [
  { id: 'PCR', name: 'Professional Conduct & Regulation', weight: 8, color: '#6366f1' },
  { id: 'GEN', name: 'General Principles of Financial Planning', weight: 15, color: '#8b5cf6' },
  { id: 'RISK', name: 'Risk Management & Insurance', weight: 11, color: '#ec4899' },
  { id: 'INV', name: 'Investment Planning', weight: 17, color: '#10b981' },
  { id: 'TAX', name: 'Tax Planning', weight: 14, color: '#f59e0b' },
  { id: 'RET', name: 'Retirement Savings & Income', weight: 19, color: '#3b82f6' },
  { id: 'EST', name: 'Estate Planning', weight: 12, color: '#14b8a6' },
  { id: 'PSY', name: 'Psychology of Financial Planning', weight: 7, color: '#f97316' },
];

// Step indicator
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div
        key={i}
        className={clsx(
          'w-2.5 h-2.5 rounded-full transition-all',
          i + 1 === currentStep
            ? 'w-8 bg-teal-500'
            : i + 1 < currentStep
              ? 'bg-success-500'
              : 'bg-slate-200 dark:bg-slate-700'
        )}
      />
    ))}
  </div>
);

// Study hours selector
interface StudyHoursSelectorProps {
  hours: number;
  onChange: (hours: number) => void;
}

const StudyHoursSelector: React.FC<StudyHoursSelectorProps> = ({ hours, onChange }) => {
  const options = [1, 1.5, 2, 2.5, 3, 4];

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((h) => (
        <button
          key={h}
          type="button"
          onClick={() => onChange(h)}
          className={clsx(
            'card p-4 text-center transition-all cursor-pointer',
            hours === h
              ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20'
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
          )}
        >
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {h}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            hours/day
          </div>
        </button>
      ))}
    </div>
  );
};

// Study days selector
interface StudyDaysSelectorProps {
  days: number;
  onChange: (days: number) => void;
}

const StudyDaysSelector: React.FC<StudyDaysSelectorProps> = ({ days, onChange }) => {
  const options = [
    { value: 5, label: 'Weekdays Only', description: 'Mon-Fri' },
    { value: 6, label: '6 Days', description: 'One rest day' },
    { value: 7, label: 'Every Day', description: 'Maximum pace' },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            'card p-4 flex items-center gap-4 transition-all cursor-pointer',
            days === opt.value
              ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20'
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
          )}
        >
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {opt.value}
          </div>
          <div className="text-left">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {opt.label}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              {opt.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const CFPStudyPlanSetup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const today = new Date();
  const minDate = format(addDays(today, 14), 'yyyy-MM-dd');
  const maxDate = format(addDays(today, 365), 'yyyy-MM-dd');

  const daysUntilExam = examDate ? differenceInDays(examDate, today) : 0;
  const weeksUntilExam = Math.floor(daysUntilExam / 7);
  const totalStudyHours = Math.floor(daysUntilExam * (daysPerWeek / 7) * hoursPerDay);

  // CFP typically requires 250 hours of study
  const recommendedHours = 250;
  const isEnoughTime = totalStudyHours >= recommendedHours * 0.8; // Allow some buffer

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    
    // In a real implementation, this would save to Firebase
    // For now, we'll just navigate to the dashboard
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Save study plan to user profile
    // await saveStudyPlan({ examDate, hoursPerDay, daysPerWeek });
    
    navigate('/cfp/dashboard');
  };

  const canProceed = () => {
    if (step === 1) return examDate !== null;
    if (step === 2) return hoursPerDay > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cfp/dashboard"
            className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-teal-500 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Create Your CFP® Study Plan
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Set your exam date and customize your study schedule
          </p>
        </div>

        <StepIndicator currentStep={step} totalSteps={3} />

        {/* Step 1: Exam Date */}
        {step === 1 && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  When is your CFP® exam?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  We'll create a personalized study schedule
                </p>
              </div>
            </div>

            <div className="mb-6">
              <input
                type="date"
                value={examDate ? format(examDate, 'yyyy-MM-dd') : ''}
                min={minDate}
                max={maxDate}
                onChange={(e) => setExamDate(e.target.value ? new Date(e.target.value) : null)}
                className="input-field w-full text-lg"
              />
            </div>

            {examDate && (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {daysUntilExam} days until your exam
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  That's approximately {weeksUntilExam} weeks to prepare
                </p>
              </div>
            )}

            {/* CFP Domains Preview */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Your study plan will cover all 8 CFP® domains:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {CFP_DOMAINS.map((domain) => (
                  <div
                    key={domain.id}
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: domain.color }}
                    />
                    <span>{domain.name}</span>
                    <span className="text-slate-400">({domain.weight}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Study Hours */}
        {step === 2 && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  How much time can you study daily?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Be realistic - consistency beats intensity
                </p>
              </div>
            </div>

            <StudyHoursSelector hours={hoursPerDay} onChange={setHoursPerDay} />

            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                How many days per week?
              </h3>
              <StudyDaysSelector days={daysPerWeek} onChange={setDaysPerWeek} />
            </div>
          </Card>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Your Study Plan Summary
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Review and confirm your personalized plan
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-300">Exam Date</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {examDate && format(examDate, 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-300">Days Until Exam</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {daysUntilExam} days
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-300">Study Schedule</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {hoursPerDay} hours/day, {daysPerWeek} days/week
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-300">Total Study Hours</span>
                <span className="font-bold text-lg text-teal-600 dark:text-teal-400">
                  ~{totalStudyHours} hours
                </span>
              </div>
            </div>

            {/* Time assessment */}
            <div className={clsx(
              'mt-6 p-4 rounded-lg flex items-start gap-3',
              isEnoughTime
                ? 'bg-success-50 dark:bg-success-900/20'
                : 'bg-warning-50 dark:bg-warning-900/20'
            )}>
              {isEnoughTime ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-success-800 dark:text-success-200">
                      Great schedule!
                    </p>
                    <p className="text-sm text-success-700 dark:text-success-300">
                      You'll have enough time to cover all topics thoroughly. CFP candidates typically need 250+ hours.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-warning-800 dark:text-warning-200">
                      Ambitious timeline
                    </p>
                    <p className="text-sm text-warning-700 dark:text-warning-300">
                      Most CFP candidates need 250+ hours. Consider extending your timeline or increasing study hours.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Domain breakdown */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Approximate hours per domain:
              </h3>
              <div className="space-y-2">
                {CFP_DOMAINS.map((domain) => {
                  const domainHours = Math.round((domain.weight / 100) * totalStudyHours);
                  return (
                    <div key={domain.id} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: domain.color }}
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">
                        {domain.name}
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        ~{domainHours}h
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className={step === 1 ? 'invisible' : ''}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create My Plan
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CFPStudyPlanSetup;
