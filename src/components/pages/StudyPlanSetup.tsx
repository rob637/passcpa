/**
 * StudyPlanSetup - Wizard to create a personalized study plan
 * 
 * Multi-step process:
 * 1. Section selection (which part of the exam)
 * 2. Exam date
 * 3. Daily availability (hours/day, days/week)
 * 4. Prior experience
 * 5. Optional: Diagnostic quiz
 * 6. Reality check & plan generation
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Clock,
  BookOpen,
  Target,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Map,
  TrendingUp,
  AlertCircle,
  Info,
} from 'lucide-react';
import { Button } from '../common/Button';
import { useCourse } from '../../providers/CourseProvider';
import { useAuth } from '../../hooks/useAuth';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { generateRealityCheck, validatePlanInput, PlanValidation } from '../../services/studyPlanService';
import { COURSES } from '../../courses';
import type { ExamSectionConfig } from '../../types/course';
import type { StudyPlanSetupInput, RealityCheck } from '../../types/studyPlan';
import { SECTION_STUDY_HOURS as INDUSTRY_HOURS } from '../../types/studyPlan';
import { addMonths } from 'date-fns';
import clsx from 'clsx';
import logger from '../../utils/logger';
import { parseLocalDate } from '../../utils/dateHelpers';

type Step = 'section' | 'exam-date' | 'availability' | 'experience' | 'assessment' | 'reality-check' | 'complete';

const STEPS: Step[] = ['section', 'exam-date', 'availability', 'experience', 'assessment', 'reality-check', 'complete'];

const StudyPlanSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useCourse();
  const { userProfile, updateUserProfile } = useAuth();
  const { createPlan, plan: existingPlan, loading: planLoading } = useStudyPlan();
  
  // Form state - will be pre-filled from existing plan if available
  const [currentStep, setCurrentStep] = useState<Step>('section');
  const [section, setSection] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('');
  const [weekdayHours, setWeekdayHours] = useState<number>(2);
  const [weekendHours, setWeekendHours] = useState<number>(3);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(6);
  const [priorExperience, setPriorExperience] = useState<'none' | 'some' | 'retake'>('none');
  const [realityCheck, setRealityCheck] = useState<RealityCheck | null>(null);
  const [validation, setValidation] = useState<PlanValidation | null>(null);
  const [warningsAcknowledged, setWarningsAcknowledged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [assessmentChoice, setAssessmentChoice] = useState<'skip' | 'take' | null>(null);
  const [savingPlan, setSavingPlan] = useState(false);
  
  // Get course sections
  const course = COURSES[courseId];
  const sections = course?.sections || [];
  
  // Single-exam courses (CISA, CFP) skip section selection
  const isSingleExamCourse = ['cisa', 'cfp'].includes(courseId);
  
  // Pre-fill from existing plan or user profile
  useEffect(() => {
    // Don't initialize while plan is still loading
    if (planLoading || initialized) return;
    
    if (existingPlan) {
      // Pre-fill from existing plan
      setSection(existingPlan.section || '');
      if (existingPlan.examDate) {
        const date = existingPlan.examDate instanceof Date 
          ? existingPlan.examDate 
          : new Date(existingPlan.examDate);
        setExamDate(date.toISOString().split('T')[0]);
      }
      setWeekdayHours(existingPlan.setup?.weekdayHours ?? existingPlan.hoursPerDay ?? 2);
      setWeekendHours(existingPlan.setup?.weekendHours ?? (existingPlan.hoursPerDay ? existingPlan.hoursPerDay + 1 : 3));
      setDaysPerWeek(existingPlan.studyDaysPerWeek || 6);
      if (existingPlan.setup?.priorExperience) {
        setPriorExperience(existingPlan.setup.priorExperience);
      }
      setInitialized(true);
    } else if (isSingleExamCourse) {
      // Single-exam courses use 'ALL' to cover all domains and skip section selection
      setSection('ALL');
      setCurrentStep('exam-date');
      setInitialized(true);
    } else if (userProfile?.examSection) {
      setSection(userProfile.examSection);
      setInitialized(true);
    }
  }, [planLoading, existingPlan, isSingleExamCourse, sections, userProfile, initialized]);
  
  // Handle return from diagnostic assessment
  useEffect(() => {
    const state = location.state as { fromAssessment?: boolean; assessmentComplete?: boolean } | null;
    if (state?.fromAssessment && state?.assessmentComplete) {
      // Returning from diagnostic - skip to reality check
      setAssessmentChoice('take');
      setCurrentStep('reality-check');
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  // Calculate reality check when moving to that step
  useEffect(() => {
    if (currentStep === 'reality-check' && section && examDate) {
      // Reality check now uses contentRegistry internally — no need to fetch lessons
      try {
        // Compute effective hoursPerDay for reality check
        const wkndDays = Math.min(daysPerWeek, 2);
        const wkdyDays = Math.max(0, daysPerWeek - wkndDays);
        const effHpd = daysPerWeek > 0
          ? (wkdyDays * weekdayHours + wkndDays * weekendHours) / daysPerWeek
          : weekdayHours;

        const input: StudyPlanSetupInput = {
          courseId,
          section,
          examDate: parseLocalDate(examDate),
          hoursPerDay: effHpd,
          weekdayHours,
          weekendHours,
          studyDaysPerWeek: daysPerWeek,
          priorExperience,
        };
        const check = generateRealityCheck(input);
        setRealityCheck(check);
        
        // Run validation
        const validationResult = validatePlanInput(input);
        setValidation(validationResult);
        // Reset acknowledgment when inputs change
        setWarningsAcknowledged(false);
      } catch (err) {
        logger.error('Error calculating reality check:', err);
      }
    }
  }, [currentStep, section, examDate, weekdayHours, weekendHours, daysPerWeek, priorExperience, courseId]);
  
  const stepIndex = STEPS.indexOf(currentStep);
  
  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 'section':
        return !!section;
      case 'exam-date':
        return !!examDate;
      case 'availability':
        return weekdayHours >= 0.5 && daysPerWeek >= 1;
      case 'experience':
        return !!priorExperience;
      case 'assessment':
        return assessmentChoice !== null;
      case 'reality-check':
        return true;
      default:
        return false;
    }
  };
  
  const goNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      let nextStep = STEPS[currentIndex + 1];
      // Skip section step for single-exam courses
      if (nextStep === 'section' && isSingleExamCourse) {
        nextStep = STEPS[currentIndex + 2];
      }
      
      // Handle assessment step - if they chose 'take', go to diagnostic page
      if (currentStep === 'assessment' && assessmentChoice === 'take') {
        // Navigate to diagnostic with return path
        navigate('/diagnostic', { 
          state: { 
            section, 
            returnTo: '/study-plan/setup',
            assessmentMode: true 
          } 
        });
        return;
      }
      
      setCurrentStep(nextStep);
    }
  };
  
  const goBack = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      let prevStep = STEPS[currentIndex - 1];
      // Skip section step for single-exam courses
      if (prevStep === 'section' && isSingleExamCourse) {
        prevStep = 'section'; // Will actually go to intro, but we'll handle navigation
        navigate(-1);
        return;
      }
      setCurrentStep(prevStep);
    } else {
      navigate(-1);
    }
  };
  
  const handleCreatePlan = async () => {
    try {
      setError(null);
      setSavingPlan(true);
      
      // Content counts are now auto-filled from contentRegistry inside generateStudyPlan
      // No need to fetch lessons manually
      // Compute effective hoursPerDay as weighted average for backward compat
      const weekendStudyDays = Math.min(daysPerWeek, 2);
      const weekdayStudyDays = Math.max(0, daysPerWeek - weekendStudyDays);
      const effectiveHoursPerDay = daysPerWeek > 0
        ? (weekdayStudyDays * weekdayHours + weekendStudyDays * weekendHours) / daysPerWeek
        : weekdayHours;

      const input: StudyPlanSetupInput = {
        courseId,
        section,
        examDate: parseLocalDate(examDate),
        hoursPerDay: effectiveHoursPerDay,
        weekdayHours,
        weekendHours,
        studyDaysPerWeek: daysPerWeek,
        priorExperience,
        startDate: new Date(),
      };
      
      await createPlan(input);
      
      // Update the user's active section to match the plan they just created
      // This ensures Home, Daily Plan, and Study Plan all show the same section
      if (section !== userProfile?.examSection) {
        await updateUserProfile({ examSection: section });
        logger.info(`Updated user's active section to ${section}`);
      }
      
      // Navigate directly to the study plan (no confirmation screen needed)
      navigate('/study-plan');
    } catch (err) {
      // Always log errors to console, even in production, for debugging
      console.error('Error creating study plan:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to create study plan: ${errorMessage}`);
    } finally {
      setSavingPlan(false);
    }
  };
  
  // Render step content
  const renderStep = () => {
    switch (currentStep) {
      case 'section':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Which section are you studying?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Select the {course?.shortName} section you want to prepare for
              </p>
            </div>
            
            <div className="space-y-3 max-w-md mx-auto">
              {sections.map((s: ExamSectionConfig) => (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={clsx(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    section === s.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={clsx(
                        'w-12 h-12 rounded-lg flex items-center justify-center font-bold',
                        section === s.id 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      )}
                    >
                      {s.shortName}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">{s.name}</p>
                      {s.weight && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Weight: {s.weight}
                        </p>
                      )}
                    </div>
                    {section === s.id && (
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'exam-date':
        const today = new Date().toISOString().split('T')[0];
        const maxDate = addMonths(new Date(), 12).toISOString().split('T')[0];
        
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                When is your exam?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                This helps us calculate the right pace for your study plan
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={today}
                max={maxDate}
                className="w-full p-4 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl 
                         focus:border-primary-500 focus:ring-primary-500 
                         bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              
              {/* Quick select buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[4, 6, 8, 12].map((weeks) => {
                  const date = new Date();
                  date.setDate(date.getDate() + weeks * 7);
                  const dateStr = date.toISOString().split('T')[0];
                  
                  return (
                    <button
                      key={weeks}
                      onClick={() => setExamDate(dateStr)}
                      className={clsx(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        examDate === dateStr
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      )}
                    >
                      {weeks} weeks
                    </button>
                  );
                })}
              </div>
              
              {examDate && (
                <p className="mt-4 text-center text-slate-600 dark:text-slate-400">
                  That's <span className="font-semibold text-primary-600">
                    {Math.ceil((parseLocalDate(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </span> from today
                </p>
              )}
            </div>
          </div>
        );
        
      case 'availability':
        // Compute the effective weekly total for the summary
        const weekendDays = Math.min(daysPerWeek, 2);
        const weekdayDays = Math.max(0, daysPerWeek - weekendDays);
        const weeklyTotal = weekdayDays * weekdayHours + weekendDays * weekendHours;

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                How much time can you commit?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Be realistic — consistency beats intensity
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-8">
              {/* Weekday hours */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Weekday hours <span className="text-slate-400 font-normal">(Mon–Fri)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setWeekdayHours(hours)}
                      className={clsx(
                        'px-4 py-3 rounded-xl font-medium transition-all',
                        weekdayHours === hours
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      )}
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekend hours */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Weekend hours <span className="text-slate-400 font-normal">(Sat–Sun)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 1.5, 2, 3, 4, 5, 6].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setWeekendHours(hours)}
                      className={clsx(
                        'px-4 py-3 rounded-xl font-medium transition-all',
                        weekendHours === hours
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      )}
                    >
                      {hours === 0 ? 'Off' : `${hours}h`}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Days per week */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Days per week
                </label>
                <div className="flex flex-wrap gap-2">
                  {[4, 5, 6, 7].map((days) => (
                    <button
                      key={days}
                      onClick={() => setDaysPerWeek(days)}
                      className={clsx(
                        'px-6 py-3 rounded-xl font-medium transition-all',
                        daysPerWeek === days
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      )}
                    >
                      {days} days
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  That's <span className="font-bold text-primary-600">
                    {weeklyTotal.toFixed(1)} hours
                  </span> per week
                  {weekdayHours !== weekendHours && (
                    <span className="text-slate-500 text-sm block mt-1">
                      {weekdayHours}h × {weekdayDays} weekdays + {weekendHours}h × {weekendDays} weekend days
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'experience':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What's your starting point?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                This helps us estimate how much time you'll need
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-3">
              {[
                { 
                  value: 'none', 
                  label: "I'm new to this material", 
                  description: "First time studying for this section",
                  icon: '🌱'
                },
                { 
                  value: 'some', 
                  label: "I have some background", 
                  description: "Studied in school or work experience",
                  icon: '📚'
                },
                { 
                  value: 'retake', 
                  label: "This is a retake", 
                  description: "I've taken this exam before",
                  icon: '🔄'
                },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriorExperience(option.value as 'none' | 'some' | 'retake')}
                  className={clsx(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    priorExperience === option.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{option.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">{option.label}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{option.description}</p>
                    </div>
                    {priorExperience === option.value && (
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'assessment':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Identify Your Strengths & Gaps
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Optional: Take a quick assessment to personalize your study plan
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <button
                onClick={() => setAssessmentChoice('take')}
                className={clsx(
                  'w-full p-5 rounded-xl border-2 text-left transition-all',
                  assessmentChoice === 'take'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📋</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">Take 30-Question Assessment</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      ~20 minutes • Identifies weak topics to prioritize
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-2">
                      Recommended for best results
                    </p>
                  </div>
                  {assessmentChoice === 'take' && (
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              <button
                onClick={() => setAssessmentChoice('skip')}
                className={clsx(
                  'w-full p-5 rounded-xl border-2 text-left transition-all',
                  assessmentChoice === 'skip'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">⏭️</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">Skip for Now</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Your plan will adapt as you practice
                    </p>
                  </div>
                  {assessmentChoice === 'skip' && (
                    <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4">
                Don't worry — the adaptive engine adjusts based on your practice performance regardless
              </p>
            </div>
          </div>
        );
        
      case 'reality-check':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className={clsx(
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                realityCheck?.severity === 'good' 
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : realityCheck?.severity === 'warning'
                  ? 'bg-amber-100 dark:bg-amber-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              )}>
                {realityCheck?.severity === 'good' ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : realityCheck?.severity === 'warning' ? (
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {realityCheck?.severity === 'good' ? "You're All Set!" : "Let's Check Your Timeline"}
              </h2>
            </div>
            
            {realityCheck && (
              <div className="max-w-md mx-auto space-y-6">
                {/* Industry benchmark callout */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Industry Average: {INDUSTRY_HOURS[section] || 100} hours
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Based on exam board recommendations
                    </p>
                  </div>
                </div>
                
                {/* Time breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Your study time needed</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ~{realityCheck.hoursNeeded} hours
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
                    (Lessons + MCQs + Flashcards + TBS)
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Hours available</span>
                    <span className={clsx(
                      'font-bold',
                      realityCheck.isRealistic 
                        ? 'text-green-600' 
                        : 'text-amber-600'
                    )}>
                      {realityCheck.hoursAvailable} hours
                    </span>
                  </div>
                  {realityCheck.hourDeficit > 0 && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Shortfall</span>
                      <span className="font-bold text-red-600">
                        -{realityCheck.hourDeficit} hours
                      </span>
                    </div>
                  )}
                  {realityCheck.hourSurplus >= 10 && (
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Buffer time</span>
                      <span className="font-bold text-green-600">
                        +{realityCheck.hourSurplus} hours
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Message */}
                <div className={clsx(
                  'p-4 rounded-xl',
                  realityCheck.severity === 'good' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : realityCheck.severity === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                )}>
                  <p>{realityCheck.message}</p>
                </div>
                
                {/* Option to reduce pace when surplus exists */}
                {realityCheck.isRealistic && realityCheck.relaxedHoursPerDay && realityCheck.relaxedHoursPerDay < (weekdayHours * 0.8 + weekendHours * 0.2) - 0.5 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Want a more relaxed schedule?
                    </p>
                    <button 
                      type="button"
                      onClick={() => {
                        // Scale both weekday/weekend proportionally
                        const currentAvg = (weekdayHours + weekendHours) / 2;
                        const ratio = currentAvg > 0 ? realityCheck.relaxedHoursPerDay! / currentAvg : 1;
                        setWeekdayHours(Math.round(weekdayHours * ratio * 2) / 2); // Round to 0.5
                        setWeekendHours(Math.round(weekendHours * ratio * 2) / 2);
                      }}
                      className="w-full p-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-left transition-all cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md"
                    >
                      <p className="font-medium text-slate-900 dark:text-white">
                        Study ~{realityCheck.relaxedHoursPerDay}h/day instead
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        You'll still finish with time to spare
                      </p>
                    </button>
                  </div>
                )}
                
                {/* Suggested actions (if not realistic) */}
                {!realityCheck.isRealistic && realityCheck.suggestedActions.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Options to consider:
                    </p>
                    {realityCheck.suggestedActions.slice(0, 3).map((action, index) => (
                      <button 
                        key={index}
                        type="button"
                        onClick={() => {
                          // Apply the action's value to update the plan
                          if (action.type === 'extend-date' && action.newValue instanceof Date) {
                            setExamDate(action.newValue.toISOString().split('T')[0]);
                          } else if (action.type === 'increase-hours' && typeof action.newValue === 'number') {
                            // Scale both weekday/weekend proportionally
                            const currentAvg = (weekdayHours + weekendHours) / 2;
                            const ratio = currentAvg > 0 ? action.newValue / currentAvg : 1;
                            setWeekdayHours(Math.round(weekdayHours * ratio * 2) / 2);
                            setWeekendHours(Math.round(weekendHours * ratio * 2) / 2);
                          } else if (action.type === 'more-days' && typeof action.newValue === 'number') {
                            setDaysPerWeek(action.newValue);
                          }
                          // accept-risk and cram-mode don't need to change values
                        }}
                        className={clsx(
                          'w-full p-3 rounded-lg border-2 text-left transition-all cursor-pointer hover:shadow-md',
                          action.recommended
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-700'
                        )}
                      >
                        <p className="font-medium text-slate-900 dark:text-white">
                          {action.label}
                          {action.recommended && (
                            <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">
                              Recommended
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {action.description}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Validation Errors - Block creation */}
                {validation && validation.errors.length > 0 && (
                  <div className="space-y-2 mt-6">
                    {validation.errors.map((err, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 text-sm">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Validation Warnings - Require acknowledgment */}
                {validation && validation.warnings.length > 0 && validation.errors.length === 0 && (
                  <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-3">
                      Please review these considerations:
                    </p>
                    <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300 mb-4">
                      {validation.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={warningsAcknowledged}
                        onChange={(e) => setWarningsAcknowledged(e.target.checked)}
                        className="w-4 h-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-amber-800 dark:text-amber-200">
                        I understand and want to proceed with this plan
                      </span>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        );
        
      case 'complete':
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Your Study Plan is Ready! 🎉
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                You're all set to start your journey to passing {section}
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Button
                onClick={() => navigate('/study-plan')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold"
              >
                <Map className="w-5 h-5 mr-2" />
                View My Study Plan
              </Button>
              
              <button
                onClick={() => navigate(-1)}
                className="mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Return to Home
              </button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with progress */}
        {currentStep !== 'complete' && (
          <div className="mb-8">
            {/* Back button */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            
            {/* Progress bar */}
            <div className="flex gap-2">
              {STEPS.filter(s => !(s === 'section' && isSingleExamCourse) && s !== 'complete').map((step) => (
                <div
                  key={step}
                  className={clsx(
                    'h-1.5 flex-1 rounded-full transition-colors',
                    STEPS.indexOf(step) <= stepIndex
                      ? 'bg-primary-600'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Step content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {renderStep()}
          
          {/* Error message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Navigation buttons */}
          {currentStep !== 'complete' && (
            <div className="mt-8 flex gap-4">
              {currentStep === 'reality-check' ? (
                <Button
                  onClick={handleCreatePlan}
                  disabled={
                    savingPlan || 
                    (validation !== null && !validation.isValid) || 
                    (validation !== null && validation.warnings.length > 0 && !warningsAcknowledged)
                  }
                  loading={savingPlan}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Create My Plan
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanSetup;
