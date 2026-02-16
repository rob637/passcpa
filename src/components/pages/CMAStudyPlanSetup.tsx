/**
 * CMA Study Plan Setup Component
 * 
 * Allows users to set exam dates and generate a personalized study plan for CMA.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { COURSE_DISPLAY_STATS } from '../../config/contentStats';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  FileSpreadsheet,
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
        className="input w-full"
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
  // Exam format preference: 'essay' (legacy) or 'cbq' (new format)
  // May-Aug 2026 = transition window (choice), Sept 2026+ = CBQ mandatory
  const [examFormat, setExamFormat] = useState<'essay' | 'cbq' | null>(null);

  const [generatedPlan, setGeneratedPlan] = useState<CMAStudyPlan | null>(null);

  // CBQ transition dates
  const CBQ_TRANSITION_START = new Date('2026-05-01');
  const CBQ_MANDATORY_DATE = new Date('2026-09-01');

  // Determine if format selection is needed based on exam dates
  const getFormatRequirement = (): 'essay-only' | 'choice' | 'cbq-only' | 'none' => {
    const earliestExamDate = examDates.CMA1 || examDates.CMA2 
      ? new Date(Math.min(
          ...[examDates.CMA1, examDates.CMA2]
            .filter(Boolean)
            .map(d => new Date(d).getTime())
        ))
      : null;

    if (!earliestExamDate) return 'none';

    if (earliestExamDate >= CBQ_MANDATORY_DATE) {
      return 'cbq-only'; // Sept 2026+: CBQ is mandatory
    } else if (earliestExamDate >= CBQ_TRANSITION_START) {
      return 'choice'; // May-Aug 2026: Candidate can choose
    } else {
      return 'essay-only'; // Before May 2026: Essay format only
    }
  };

  // Determine total steps based on format requirement
  const formatRequirement = getFormatRequirement();
  const needsFormatStep = formatRequirement === 'choice';
  const totalSteps = needsFormatStep ? 4 : 3;

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
      setStep(totalSteps); // Go to final review step
    }, 1500);
  };

  // Navigate from step 1 (dates) to next step
  const handleNextFromDates = () => {
    if (needsFormatStep) {
      setStep(2); // Go to format selection
    } else {
      // Auto-set format based on requirement
      if (formatRequirement === 'cbq-only') {
        setExamFormat('cbq');
      } else if (formatRequirement === 'essay-only') {
        setExamFormat('essay');
      }
      setStep(needsFormatStep ? 3 : 2); // Go to confirmation
    }
  };

  const handleSavePlan = () => {
    // Save to local storage or backend
    if (generatedPlan) {
      // Include exam format preference in saved data
      const planWithFormat = {
        ...generatedPlan,
        examFormat: examFormat || (formatRequirement === 'cbq-only' ? 'cbq' : 'essay'),
      };
      localStorage.setItem('cma_study_plan', JSON.stringify(planWithFormat));
      localStorage.setItem('cma_exam_format', examFormat || (formatRequirement === 'cbq-only' ? 'cbq' : 'essay'));
      navigate('/cma/dashboard');
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

        <StepIndicator currentStep={step} totalSteps={totalSteps} />

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
              <Button
                variant="primary"
                onClick={handleNextFromDates}
                disabled={!examDates.CMA1 && !examDates.CMA2}
                rightIcon={ChevronRight}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Exam Format Selection (only shown during May-Aug 2026 transition window) */}
        {step === 2 && needsFormatStep && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <div className="card p-6 bg-white dark:bg-slate-900 border-purple-100 dark:border-purple-900/30 shadow-xl shadow-purple-900/5">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                Choose Your Exam Format
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                Your exam date falls in the transition window (May-August 2026). You can choose between the legacy Essay format or the new Case-Based Questions (CBQ) format.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Essay Option */}
                <button
                  onClick={() => setExamFormat('essay')}
                  className={clsx(
                    'p-5 rounded-xl border-2 text-left transition-all',
                    examFormat === 'essay'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Essay Format</h3>
                      <p className="text-xs text-slate-500">Legacy format (ends Aug 2026)</p>
                    </div>
                  </div>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• 2 written essays per part</li>
                    <li>• 30 minutes per essay</li>
                    <li>• Typed response to scenario</li>
                  </ul>
                </button>

                {/* CBQ Option */}
                <button
                  onClick={() => setExamFormat('cbq')}
                  className={clsx(
                    'p-5 rounded-xl border-2 text-left transition-all relative',
                    examFormat === 'cbq'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  )}
                >
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">NEW</span>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">CBQ Format</h3>
                      <p className="text-xs text-slate-500">New format (mandatory Sept 2026+)</p>
                    </div>
                  </div>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• 2 case scenarios per part</li>
                    <li>• 15-20 minutes per case</li>
                    <li>• Interactive questions (calculations, drag-and-drop, multi-select)</li>
                  </ul>
                </button>
              </div>

              {!examFormat && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Select your preferred exam format to continue.
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                leftIcon={ChevronLeft}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                disabled={!examFormat}
                rightIcon={ChevronRight}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 2/3: Confirm & Generate */}
        {step === (needsFormatStep ? 3 : 2) && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <div className="card p-8 text-center bg-white dark:bg-slate-900 border-purple-100 dark:border-purple-900/30">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Ready to Generate?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Our AI will analyze your timeline and distribute {COURSE_DISPLAY_STATS.cma.lessons} lessons and {COURSE_DISPLAY_STATS.cma.questions} questions evenly across your available days.
              </p>
              
              <Button
                variant="primary"
                onClick={handleGenerate}
                disabled={loading}
                loading={loading}
                size="lg"
                className="w-full max-w-xs shadow-lg shadow-purple-500/20"
              >
                {loading ? 'Generating Plan...' : 'Generate My Plan'}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => setStep(needsFormatStep ? 2 : 1)}
              fullWidth
              className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 text-sm"
            >
              {needsFormatStep ? 'Back to Format Selection' : 'Back to Dates'}
            </Button>
          </div>
        )}

        {/* Step 3/4: Plan Review */}
        {step === totalSteps && generatedPlan && (
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
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Daily Goal</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {generatedPlan.dailyGoals.questions}
                  <span className="text-sm font-normal text-slate-500 ml-1">questions</span>
                </p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Daily Study</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {Math.round(generatedPlan.hoursPerDay * 10) / 10}
                  <span className="text-sm font-normal text-slate-500 ml-1">hours</span>
                </p>
              </Card>
            </div>

            <Button
              variant="success"
              onClick={handleSavePlan}
              fullWidth
              size="lg"
              className="shadow-lg shadow-emerald-500/20"
            >
              Start Studying
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMAStudyPlanSetup;
