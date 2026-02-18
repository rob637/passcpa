/**
 * CPA Study Plan Setup Component
 * 
 * Allows users to set exam dates and generate a personalized study plan.
 * Handles CPA's unique structure: 3 Core sections + 1 Discipline choice.
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
  Info,
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { 
  CPASectionId, 
  CPACoreSectionId,
  CPADisciplineSectionId,
  CPA_SECTION_CONFIG,
  CPA_CORE_SECTIONS,
  CPA_DISCIPLINE_SECTIONS,
} from '../../courses/cpa';
import { 
  generateCPAStudyPlan, 
  CPAStudyPlan, 
  getStudyPlanSummary,
  getRecommendedOrderReason,
} from '../../utils/cpaStudyPlanner';
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

// Discipline selector
interface DisciplineSelectorProps {
  selected: CPADisciplineSectionId | null;
  onSelect: (discipline: CPADisciplineSectionId) => void;
}

const DisciplineSelector: React.FC<DisciplineSelectorProps> = ({ selected, onSelect }) => (
  <div className="space-y-3">
    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
      <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-700 dark:text-blue-300">
        Choose one discipline section based on your career interest. 
        All CPAs can practice in any area — this doesn't limit your career.
      </p>
    </div>
    
    {CPA_DISCIPLINE_SECTIONS.map((disciplineId) => {
      const config = CPA_SECTION_CONFIG[disciplineId];
      return (
        <button
          key={disciplineId}
          type="button"
          onClick={() => onSelect(disciplineId)}
          className={clsx(
            'card p-4 w-full text-left flex items-start gap-4 transition-all cursor-pointer',
            selected === disciplineId
              ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
          )}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ backgroundColor: config.color }}
          >
            {config.shortName}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {config.name}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              {config.description}
            </div>
            <div className="flex flex-wrap gap-1">
              {config.topics.slice(0, 3).map((topic, i) => (
                <span 
                  key={i}
                  className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          {selected === disciplineId && (
            <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
          )}
        </button>
      );
    })}
  </div>
);

// Date picker card for core sections
interface CoreExamDateCardProps {
  sectionId: CPACoreSectionId;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
}

const CoreExamDateCard: React.FC<CoreExamDateCardProps> = ({ sectionId, date, onDateChange }) => {
  const config = CPA_SECTION_CONFIG[sectionId];
  const today = new Date();
  const minDate = format(addDays(today, 14), 'yyyy-MM-dd');
  const maxDate = format(addDays(today, 730), 'yyyy-MM-dd'); // 2 years (30-month window)

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
    <div className="space-y-4">
      <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700 dark:text-amber-300">
          CPA candidates typically study 15-25 hours per week. Be realistic — consistency beats intensity.
        </p>
      </div>
      
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
  plan: CPAStudyPlan;
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

    {/* Recommended Order */}
    <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Recommended Order
      </h4>
      <p className="text-sm text-blue-700 dark:text-blue-300">
        {getRecommendedOrderReason()}
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
            {plan.dailyGoals.tbsPerWeek} TBS/week
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
        {plan.milestones.slice(0, 8).map((milestone, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div
              className={clsx(
                'w-2 h-2 rounded-full',
                milestone.type === 'exam' ? 'bg-success-500' : 
                milestone.type === 'review-start' ? 'bg-warning-500' :
                milestone.type === 'section-complete' ? 'bg-primary-500' :
                'bg-slate-400'
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

const CPAStudyPlanSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form state
  const [discipline, setDiscipline] = useState<CPADisciplineSectionId | null>(null);
  const [examDates, setExamDates] = useState<Partial<Record<CPASectionId, Date>>>({});
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [studyDaysPerWeek, setStudyDaysPerWeek] = useState(5);
  const [generatedPlan, setGeneratedPlan] = useState<CPAStudyPlan | null>(null);

  const hasAtLeastOneDate = Object.values(examDates).some(d => d !== undefined);

  const handleExamDateChange = (sectionId: CPASectionId, date: Date | null) => {
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
    const plan = generateCPAStudyPlan({
      examDates,
      discipline,
      hoursPerDay,
      studyDaysPerWeek,
    });
    setGeneratedPlan(plan);
    setStep(5);
  };

  const handleSavePlan = async () => {
    if (!user || !generatedPlan) {
      navigate('/cpa');
      return;
    }
    
    try {
      // Save the generated plan to Firestore
      await setDoc(doc(db, 'users', user.uid, 'settings', 'cpaStudyPlan'), {
        ...generatedPlan,
        savedAt: new Date().toISOString(),
      });
      
      // Also save discipline choice to user profile
      if (discipline) {
        await setDoc(doc(db, 'users', user.uid), {
          cpaDiscipline: discipline,
        }, { merge: true });
      }
      
      logger.info('CPA Study plan saved', { planId: generatedPlan.id, discipline });
      navigate('/cpa');
    } catch (error) {
      logger.error('Failed to save CPA study plan', error);
      navigate('/cpa');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return discipline !== null;
      case 2: return hasAtLeastOneDate;
      case 3: return hoursPerDay > 0;
      case 4: return studyDaysPerWeek > 0;
      default: return true;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto page-enter">
      {/* Back button */}
      <Link
        to="/cpa"
        className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to CPA Dashboard
      </Link>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Create Your CPA Study Plan
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Let's build a personalized schedule for your CPA exam prep
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
                Choose your discipline
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                You'll take 3 Core sections (FAR, AUD, REG) + 1 Discipline
              </p>
            </div>
            
            <DisciplineSelector selected={discipline} onSelect={setDiscipline} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                When are your exams?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Set dates for your Core sections (Discipline date is optional)
              </p>
            </div>
            
            <div className="space-y-3">
              {CPA_CORE_SECTIONS.map(sectionId => (
                <CoreExamDateCard
                  key={sectionId}
                  sectionId={sectionId}
                  date={examDates[sectionId] || null}
                  onDateChange={(date) => handleExamDateChange(sectionId, date)}
                />
              ))}
              
              {/* Discipline section date */}
              {discipline && (
                <>
                  <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
                  <CoreExamDateCard
                    sectionId={discipline as unknown as CPACoreSectionId}
                    date={examDates[discipline] || null}
                    onDateChange={(date) => handleExamDateChange(discipline, date)}
                  />
                </>
              )}
            </div>

            {!hasAtLeastOneDate && (
              <div className="flex items-center gap-2 text-sm text-warning-600 dark:text-warning-400">
                <AlertCircle className="w-4 h-4" />
                Set at least one exam date to continue
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                How much time can you study daily?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Most successful candidates study 2-3 hours per day
              </p>
            </div>
            
            <StudyHoursSelector hours={hoursPerDay} onChange={setHoursPerDay} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                How many days per week?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Rest days help retention — don't burn out
              </p>
            </div>
            
            <StudyDaysSelector days={studyDaysPerWeek} onChange={setStudyDaysPerWeek} />
          </div>
        )}

        {step === 5 && generatedPlan && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-success-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Your plan is ready!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Review your personalized CPA study schedule
              </p>
            </div>
            
            <PlanPreview plan={generatedPlan} />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3">
        {step > 1 && step < 5 && (
          <Button
            variant="secondary"
            onClick={() => setStep(step - 1)}
            fullWidth
          >
            Back
          </Button>
        )}
        
        {step < 4 && (
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

        {step === 4 && (
          <Button
            variant="primary"
            onClick={handleGeneratePlan}
            rightIcon={Sparkles}
            fullWidth
          >
            Generate Plan
          </Button>
        )}

        {step === 5 && (
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

export default CPAStudyPlanSetup;
