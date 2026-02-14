/**
 * EA Study Plan Setup Component
 * 
 * Allows users to set exam dates and generate a personalized study plan.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { EASectionId, EA_SECTION_CONFIG } from '../../courses/ea';
import { generateEAStudyPlan, EAStudyPlan, getStudyPlanSummary } from '../../utils/eaStudyPlanner';
import { useAuth } from '../../hooks/useAuth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import logger from '../../utils/logger';

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
            ? 'w-8 bg-primary-500'
            : i + 1 < currentStep
              ? 'bg-success-500'
              : 'bg-slate-200 dark:bg-slate-700'
        )}
      />
    ))}
  </div>
);

// Date picker card
interface ExamDateCardProps {
  sectionId: EASectionId;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
}

const ExamDateCard: React.FC<ExamDateCardProps> = ({ sectionId, date, onDateChange }) => {
  const config = EA_SECTION_CONFIG[sectionId];
  const today = new Date();
  const minDate = format(addDays(today, 14), 'yyyy-MM-dd'); // At least 2 weeks out
  const maxDate = format(addDays(today, 365), 'yyyy-MM-dd'); // Up to 1 year

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: config.color }}
        >
          {sectionId}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            {config.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            {config.description}
          </p>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={date ? format(date, 'yyyy-MM-dd') : ''}
              min={minDate}
              max={maxDate}
              onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : null)}
              className="input flex-1"
            />
            {date && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDateChange(null)}
                aria-label="Clear date"
              >
                ×
              </Button>
            )}
          </div>
          {date && (
            <p className="text-xs text-slate-500 mt-1">
              {differenceInDays(date, today)} days from today
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

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
              ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
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
    { value: 5, label: 'Weekdays', sublabel: 'Mon-Fri' },
    { value: 6, label: '6 days', sublabel: 'One rest day' },
    { value: 7, label: 'Every day', sublabel: 'Maximum pace' },
  ];

  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            'card p-4 w-full text-left flex items-center gap-4 transition-all cursor-pointer',
            days === opt.value
              ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
          )}
        >
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {opt.label}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              {opt.sublabel}
            </div>
          </div>
          {days === opt.value && (
            <CheckCircle2 className="w-5 h-5 text-primary-500" />
          )}
        </button>
      ))}
    </div>
  );
};

// Plan preview
interface PlanPreviewProps {
  plan: EAStudyPlan;
}

const PlanPreview: React.FC<PlanPreviewProps> = ({ plan }) => (
  <div className="space-y-4">
    {/* Summary */}
    <Card className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-4">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
        Your Study Plan
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {getStudyPlanSummary(plan)}
      </p>
    </Card>

    {/* Daily Goals */}
    <Card className="p-4">
      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
        Daily Goals
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {plan.dailyGoals.questionsPerDay} questions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-success-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {plan.dailyGoals.lessonsPerDay} lessons
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-warning-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {plan.hoursPerDay}h study time
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {plan.dailyGoals.flashcardsPerDay} flashcards
          </span>
        </div>
      </div>
    </Card>

    {/* Milestones */}
    <Card className="p-4">
      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
        Key Milestones
      </h4>
      <div className="space-y-2">
        {plan.milestones.slice(0, 5).map((milestone, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div
              className={clsx(
                'w-2 h-2 rounded-full',
                milestone.type === 'exam' ? 'bg-success-500' : 
                milestone.type === 'review-start' ? 'bg-warning-500' :
                'bg-primary-500'
              )}
            />
            <span className="text-slate-600 dark:text-slate-400 w-16">
              {milestone.dateStr}
            </span>
            <span className="text-slate-900 dark:text-slate-100">
              {milestone.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const EAStudyPlanSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [examDates, setExamDates] = useState<Partial<Record<EASectionId, Date>>>({});
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState(5);
  const [generatedPlan, setGeneratedPlan] = useState<EAStudyPlan | null>(null);

  const hasAtLeastOneDate = Object.values(examDates).some(d => d !== undefined);

  const handleExamDateChange = (sectionId: EASectionId, date: Date | null) => {
    if (date) {
      setExamDates(prev => ({ ...prev, [sectionId]: date }));
    } else {
      setExamDates(prev => {
        const newDates = { ...prev };
        delete newDates[sectionId];
        return newDates;
      });
    }
  };

  const handleGeneratePlan = () => {
    const plan = generateEAStudyPlan({
      examDates,
      hoursPerDay,
      studyDaysPerWeek,
    });
    setGeneratedPlan(plan);
    setStep(4);
  };

  const handleSavePlan = async () => {
    if (!user || !generatedPlan) {
      navigate('/ea');
      return;
    }
    
    try {
      // Save the generated plan to Firestore
      await setDoc(doc(db, 'users', user.uid, 'settings', 'eaStudyPlan'), {
        ...generatedPlan,
        savedAt: new Date().toISOString(),
      });
      
      logger.info('EA Study plan saved', { planId: generatedPlan.id });
      navigate('/ea');
    } catch (error) {
      logger.error('Failed to save EA study plan', error);
      navigate('/ea');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return hasAtLeastOneDate;
      case 2: return hoursPerDay > 0;
      case 3: return studyDaysPerWeek > 0;
      default: return true;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto page-enter">
      {/* Back button */}
      <Link
        to="/ea"
        className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to EA Dashboard
      </Link>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Create Your Study Plan
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Let's build a personalized schedule for your EA exam prep
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator currentStep={step} totalSteps={totalSteps} />

      {/* Step content */}
      <div className="mb-8">
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                When are your exams?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Set dates for the sections you're planning to take
              </p>
            </div>
            
            <div className="space-y-3">
              {(['SEE1', 'SEE2', 'SEE3'] as EASectionId[]).map(sectionId => (
                <ExamDateCard
                  key={sectionId}
                  sectionId={sectionId}
                  date={examDates[sectionId] || null}
                  onDateChange={(date) => handleExamDateChange(sectionId, date)}
                />
              ))}
            </div>

            {!hasAtLeastOneDate && (
              <div className="flex items-center gap-2 text-sm text-warning-600 dark:text-warning-400">
                <AlertCircle className="w-4 h-4" />
                Set at least one exam date to continue
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                How much time can you study daily?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Be realistic - consistency beats intensity
              </p>
            </div>
            
            <StudyHoursSelector hours={hoursPerDay} onChange={setHoursPerDay} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                How many days per week?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Rest days help retention - don't overdo it
              </p>
            </div>
            
            <StudyDaysSelector days={studyDaysPerWeek} onChange={setStudyDaysPerWeek} />
          </div>
        )}

        {step === 4 && generatedPlan && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-success-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Your plan is ready!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Review your personalized study schedule
              </p>
            </div>
            
            <PlanPreview plan={generatedPlan} />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        {step > 1 && step < 4 && (
          <Button
            variant="secondary"
            onClick={() => setStep(step - 1)}
            fullWidth
          >
            Back
          </Button>
        )}
        
        {step < 3 && (
          <Button
            variant="primary"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            rightIcon={ChevronRight}
            fullWidth
          >
            Continue
          </Button>
        )}

        {step === 3 && (
          <Button
            variant="primary"
            onClick={handleGeneratePlan}
            rightIcon={Sparkles}
            fullWidth
          >
            Generate Plan
          </Button>
        )}

        {step === 4 && (
          <Button
            variant="primary"
            onClick={handleSavePlan}
            rightIcon={ChevronRight}
            fullWidth
          >
            Start Studying
          </Button>
        )}
      </div>
    </div>
  );
};

export default EAStudyPlanSetup;
