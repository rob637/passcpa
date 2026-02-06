/**
 * CMA Study Plan Setup Component
 * 
 * Allows users to set exam dates and generate a personalized study plan for CMA.
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
import { format } from 'date-fns';
import clsx from 'clsx';
import { CMASectionId, CMA_SECTION_CONFIG } from '../../courses/cma';
import { generateCMAStudyPlan, CMAStudyPlan } from '../../utils/cmaStudyPlanner';

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
            ? 'w-8 bg-purple-600'
            : i + 1 < currentStep
              ? 'bg-emerald-500'
              : 'bg-slate-200 dark:bg-slate-700'
        )}
      />
    ))}
  </div>
);

// Date picker card
interface ExamDateCardProps {
  sectionId: CMASectionId;
  selectedDate: string;
  onChange: (date: string) => void;
  minDate: string;
}

const ExamDateCard: React.FC<ExamDateCardProps> = ({ sectionId, selectedDate, onChange, minDate }) => {
  const config = CMA_SECTION_CONFIG[sectionId];
  
  return (
    <div className="card p-4 hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: config.color }}
        >
          {config.shortName}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">{config.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{config.questionCount} question bank</p>
        </div>
      </div>
      
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Target Exam Date
      </label>
      <input
        type="date"
        value={selectedDate}
        min={minDate}
        onChange={(e) => onChange(e.target.value)}
        className="input-field w-full"
      />
      {selectedDate && (
        <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Scheduled for {format(new Date(selectedDate), 'MMMM d, yyyy')}
        </div>
      )}
    </div>
  );
};

const CMAStudyPlanSetup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [examDates, setExamDates] = useState<Record<CMASectionId, string>>({
    CMA1: '',
    CMA2: '',
  });

  const [generatedPlan, setGeneratedPlan] = useState<CMAStudyPlan | null>(null);

  const handleDateChange = (sectionId: CMASectionId, date: string) => {
    setExamDates(prev => ({
      ...prev,
      [sectionId]: date
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    
    // Convert strings to dates
    const dates: Record<CMASectionId, Date | null> = {
      CMA1: examDates.CMA1 ? new Date(examDates.CMA1) : null,
      CMA2: examDates.CMA2 ? new Date(examDates.CMA2) : null,
    };

    // Simulate calculation time
    setTimeout(() => {
      const plan = generateCMAStudyPlan(dates);
      setGeneratedPlan(plan);
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleSavePlan = () => {
    // Save to local storage or backend
    if (generatedPlan) {
      localStorage.setItem('cma_study_plan', JSON.stringify(generatedPlan));
      navigate('/cma');
    }
  };

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <Link to="/cma/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Build Your CMA Study Plan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            We'll create a personalized daily schedule based on your exam dates to ensure you cover all material.
          </p>
        </div>

        <StepIndicator currentStep={step} totalSteps={3} />

        {/* Step 1: Exam Dates */}
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <div className="card p-6 bg-white dark:bg-slate-900 border-purple-100 dark:border-purple-900/30 shadow-xl shadow-purple-900/5">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Set Your Exam Dates
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ExamDateCard
                  sectionId="CMA1"
                  selectedDate={examDates.CMA1}
                  onChange={(d) => handleDateChange('CMA1', d)}
                  minDate={todayStr}
                />
                <ExamDateCard
                  sectionId="CMA2"
                  selectedDate={examDates.CMA2}
                  onChange={(d) => handleDateChange('CMA2', d)}
                  minDate={todayStr}
                />
              </div>

              {!examDates.CMA1 && !examDates.CMA2 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Select at least one exam date to proceed.
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!examDates.CMA1 && !examDates.CMA2}
                className="btn-primary flex items-center gap-2"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirm & Generate */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <div className="card p-8 text-center bg-white dark:bg-slate-900 border-purple-100 dark:border-purple-900/30">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Ready to Generate?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Our AI will analyze your timeline and distribute 130+ lessons and 3,000+ questions evenly across your available days.
              </p>
              
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary w-full max-w-xs h-12 text-lg shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Plan...
                  </div>
                ) : (
                  'Generate My Plan'
                )}
              </button>
            </div>
            
            <button
              onClick={() => setStep(1)}
              className="w-full text-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 text-sm"
            >
              Back to Dates
            </button>
          </div>
        )}

        {/* Step 3: Plan Review */}
        {step === 3 && generatedPlan && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <div className="card p-6 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Your Plan is Ready!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    We've created a custom schedule that gets you exam-ready by your target dates.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Daily Goal</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {generatedPlan.dailyGoals.questions}
                  <span className="text-sm font-normal text-slate-500 ml-1">questions</span>
                </p>
              </div>
              <div className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Daily Study</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {Math.round(generatedPlan.hoursPerDay * 10) / 10}
                  <span className="text-sm font-normal text-slate-500 ml-1">hours</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleSavePlan}
              className="btn-primary w-full h-12 text-lg shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
            >
              Start Studying
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMAStudyPlanSetup;
