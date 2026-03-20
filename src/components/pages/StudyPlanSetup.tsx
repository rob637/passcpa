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

import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { Button } from '../common/Button';
import { useCourse } from '../../providers/CourseProvider';
import { useStudy } from '../../providers/StudyProvider';
import { useAuth } from '../../hooks/useAuth';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { generateRealityCheck, validatePlanInput, PlanValidation } from '../../services/studyPlanService';
import { resolveStudySection, getSectionContent } from '../../services/contentRegistry';
import { COURSES } from '../../courses';
import { CORE_SECTIONS, DISCIPLINE_SECTIONS_2026 } from '../../config/examConfig';
import { getSectionDisplayInfo } from '../../utils/sectionUtils';
import type { ExamSectionConfig } from '../../types/course';
import type { StudyPlanSetupInput, RealityCheck } from '../../types/studyPlan';
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
  const { userProfile, updateUserProfile, loading: authLoading } = useAuth();
  const { createPlan, plan: existingPlan, loading: planLoading } = useStudyPlan();
  const { getLessonProgress } = useStudy();
  
  // Form state - will be pre-filled from existing plan if available
  const [currentStep, setCurrentStep] = useState<Step>('section');
  const [section, setSection] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('');
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(6);
  const [priorExperience, setPriorExperience] = useState<'none' | 'some' | 'retake'>('some');
  const [realityCheck, setRealityCheck] = useState<RealityCheck | null>(null);
  const [validation, setValidation] = useState<PlanValidation | null>(null);
  const [warningsAcknowledged, setWarningsAcknowledged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [assessmentChoice, setAssessmentChoice] = useState<'skip' | 'take' | null>('skip');
  const [savingPlan, setSavingPlan] = useState(false);
  
  // Track if we've handled the return from diagnostic assessment
  const returnedFromDiagnostic = useRef(false);
  
  // Get course sections
  const course = COURSES[courseId];
  const sections = course?.sections || [];
  
  // Single-exam courses (CISA, CFP) skip section selection
  const isSingleExamCourse = ['cisa', 'cfp'].includes(courseId);
  
  // Pre-fill from existing plan or user profile
  useEffect(() => {
    // Don't initialize while plan or auth is still loading
    if (planLoading || authLoading || initialized) return;
    
    // Check if returning from diagnostic assessment FIRST
    // This prevents the initialization logic from clobbering the step set by diagnostic return
    const state = location.state as { fromAssessment?: boolean; assessmentComplete?: boolean } | null;
    if (state?.fromAssessment && state?.assessmentComplete) {
      // Returning from diagnostic - set form values but skip to reality-check
      if (isSingleExamCourse) {
        setSection('ALL');
      }
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 8 * 7);
      setExamDate(examDate || defaultDate.toISOString().split('T')[0]);
      setAssessmentChoice('take');
      setCurrentStep('reality-check');
      setInitialized(true);
      returnedFromDiagnostic.current = true;
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
      return;
    }
    
    if (existingPlan) {
      // Pre-fill from existing plan
      setSection(existingPlan.section || '');
      if (existingPlan.examDate) {
        const date = existingPlan.examDate instanceof Date 
          ? existingPlan.examDate 
          : new Date(existingPlan.examDate);
        setExamDate(date.toISOString().split('T')[0]);
      }
      setHoursPerDay(existingPlan.hoursPerDay ?? existingPlan.setup?.weekdayHours ?? 2);
      setDaysPerWeek(existingPlan.studyDaysPerWeek || 6);
      if (existingPlan.setup?.priorExperience) {
        setPriorExperience(existingPlan.setup.priorExperience);
      }
      // Skip section selection when editing - go straight to exam date
      setCurrentStep('exam-date');
      setInitialized(true);
    } else if (isSingleExamCourse) {
      // Single-exam courses use 'ALL' to cover all domains and skip section selection
      setSection('ALL');
      // Default to 8 weeks from today
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 8 * 7);
      setExamDate(defaultDate.toISOString().split('T')[0]);
      setCurrentStep('exam-date');
      setInitialized(true);
    } else if (userProfile?.examSection) {
      // User has explicitly picked a section - use it and skip section selection
      const storedSection = userProfile.examSection;
      // Validate it belongs to current course
      const validSection = sections.some((s: ExamSectionConfig) => s.id === storedSection);
      
      if (validSection) {
        setSection(storedSection);
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 8 * 7);
        setExamDate(defaultDate.toISOString().split('T')[0]);
        setCurrentStep('exam-date');
        setInitialized(true);
      } else {
        // Section doesn't match current course - show section selection
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 8 * 7);
        setExamDate(defaultDate.toISOString().split('T')[0]);
        setInitialized(true);
      }
    } else {
      // No section picked yet - show the section picker
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 8 * 7);
      setExamDate(defaultDate.toISOString().split('T')[0]);
      setInitialized(true);
      // currentStep defaults to 'section', so picker will show
    }
  }, [planLoading, authLoading, existingPlan, isSingleExamCourse, sections, userProfile, initialized, location.state, examDate]);
  
  // Handle return from diagnostic assessment (legacy - now handled in main init effect)
  // Keeping this for safety but it should no longer be the primary handler
  useEffect(() => {
    const state = location.state as { fromAssessment?: boolean; assessmentComplete?: boolean } | null;
    if (state?.fromAssessment && state?.assessmentComplete && !returnedFromDiagnostic.current) {
      // Returning from diagnostic - skip to reality check
      setAssessmentChoice('take');
      setCurrentStep('reality-check');
      returnedFromDiagnostic.current = true;
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  // Calculate reality check when moving to that step
  useEffect(() => {
    if (currentStep === 'reality-check' && section && examDate) {
      // Reality check now uses contentRegistry internally — no need to fetch lessons
      const calculateRealityCheck = async () => {
        try {
          const input: StudyPlanSetupInput = {
            courseId,
            section,
            examDate: parseLocalDate(examDate),
            hoursPerDay,
            studyDaysPerWeek: daysPerWeek,
            priorExperience,
          };
          
          // Get total lessons from contentRegistry
          const sectionKey = resolveStudySection(courseId, section);
          const contentInfo = sectionKey ? getSectionContent(sectionKey) : null;
          const totalLessons = contentInfo?.counts?.lessons || 0;
          
          // Fetch REAL lesson progress from Firestore
          let lessonsCompleted = 0;
          try {
            const lessonProgressData = await getLessonProgress();
            // Count completed lessons for this section
            // Lesson IDs follow pattern: {section}-{id} e.g., "far-001", "cisa1-fundamentals"
            const sectionPrefix = section.toLowerCase() + '-';
            Object.entries(lessonProgressData).forEach(([lessonId, data]) => {
              // Check if lesson belongs to this section AND is completed
              if (lessonId.toLowerCase().startsWith(sectionPrefix)) {
                const lessonData = data as { completed?: boolean };
                if (lessonData.completed) {
                  lessonsCompleted++;
                }
              }
            });
            logger.info(`[StudyPlanSetup] Real progress: ${lessonsCompleted}/${totalLessons} lessons completed for ${section}`);
          } catch (err) {
            logger.warn('Could not fetch real lesson progress, falling back to plan progress:', err);
            // Fall back to existing plan progress if available
            if (existingPlan?.progress?.lessonsCompleted) {
              lessonsCompleted = existingPlan.progress.lessonsCompleted;
            }
          }
          
          // Build progress data with real completion count
          const progressData = totalLessons > 0 
            ? { lessonsCompleted, totalLessons }
            : undefined;
          
          const check = generateRealityCheck(input, progressData);
          setRealityCheck(check);
          
          // Run validation
          const validationResult = validatePlanInput(input);
          setValidation(validationResult);
          // Reset acknowledgment when inputs change
          setWarningsAcknowledged(false);
        } catch (err) {
          logger.error('Error calculating reality check:', err);
        }
      };
      
      calculateRealityCheck();
    }
  }, [currentStep, section, examDate, hoursPerDay, daysPerWeek, priorExperience, courseId, existingPlan, getLessonProgress]);
  
  const stepIndex = STEPS.indexOf(currentStep);
  
  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 'section':
        return !!section;
      case 'exam-date':
        return !!examDate;
      case 'availability':
        return hoursPerDay >= 0.5 && daysPerWeek >= 1;
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
      // Skip section step for single-exam courses OR when editing existing plan
      if (prevStep === 'section' && (isSingleExamCourse || existingPlan)) {
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
      const input: StudyPlanSetupInput = {
        courseId,
        section,
        examDate: parseLocalDate(examDate),
        hoursPerDay,
        studyDaysPerWeek: daysPerWeek,
        priorExperience,
        startDate: new Date(),
      };
      
      await createPlan(input);
      
      // Update the user's active section AND exam date to match the plan
      // This ensures Home, Daily Plan, and Study Plan all show the same section
      // CRITICAL: Updating examDates triggers daily plan regeneration
      // For single-exam courses, normalize 'ALL' to the actual section ('CISA', 'CFP')
      const normalizedSection = resolveStudySection(courseId, section) || section;
      const updates: Record<string, unknown> = {};
      if (normalizedSection !== userProfile?.examSection) {
        updates.examSection = normalizedSection;
      }
      // Always sync exam date to user profile - this triggers daily plan invalidation
      const currentExamDates = userProfile?.examDates || {};
      updates.examDates = {
        ...currentExamDates,
        [normalizedSection]: examDate, // ISO date string
      };
      
      if (Object.keys(updates).length > 0) {
        await updateUserProfile(updates);
        logger.info(`Updated user profile: section=${section}, examDate=${examDate}`);
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
              {courseId === 'cpa' ? (
                // CPA-specific section picker with Core/Discipline grouping (matches Home page)
                <>
                  {/* Core Sections */}
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">Core Sections (Required)</div>
                  {CORE_SECTIONS.map((sectionKey) => {
                    const sectionInfo = getSectionDisplayInfo(sectionKey, courseId);
                    const isSelected = sectionKey === section;
                    return (
                      <button
                        key={sectionKey}
                        onClick={() => setSection(sectionKey)}
                        className={clsx(
                          'w-full p-3 rounded-xl border-2 text-left transition-all',
                          isSelected
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                            style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
                          >
                            {sectionInfo?.shortName || sectionKey}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">{sectionInfo?.name || sectionKey}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                  
                  {/* Discipline Sections */}
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mt-3 mb-1">Discipline (Choose One)</div>
                  {DISCIPLINE_SECTIONS_2026.map((sectionKey) => {
                    const sectionInfo = getSectionDisplayInfo(sectionKey, courseId);
                    const isSelected = sectionKey === section;
                    return (
                      <button
                        key={sectionKey}
                        onClick={() => setSection(sectionKey)}
                        className={clsx(
                          'w-full p-3 rounded-xl border-2 text-left transition-all',
                          isSelected
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                            style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
                          >
                            {sectionInfo?.shortName || sectionKey}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">{sectionInfo?.name || sectionKey}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </>
              ) : (
                // Generic section picker for non-CPA courses
                sections.map((s: ExamSectionConfig) => {
                  const sectionInfo = getSectionDisplayInfo(s.id, courseId);
                  const isSelected = s.id === section;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSection(s.id)}
                      className={clsx(
                        'w-full p-4 rounded-xl border-2 text-left transition-all',
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white"
                          style={{ backgroundColor: sectionInfo?.color || '#6366f1' }}
                        >
                          {s.shortName}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{s.name}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-primary-600" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
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
        // Compute the weekly total for the summary
        const weeklyTotal = hoursPerDay * daysPerWeek;

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
              {/* Hours per day */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Hours per day
                </label>
                <div className="flex flex-wrap gap-2">
                  {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setHoursPerDay(hours)}
                      className={clsx(
                        'px-4 py-3 rounded-xl font-medium transition-all',
                        hoursPerDay === hours
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                      )}
                    >
                      {hours}h
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
                  {[3, 4, 5, 6, 7].map((days) => (
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
                {/* Time breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 space-y-4">
                  {/* Show completed hours if user has progress */}
                  {realityCheck.hoursCompleted > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Hours completed</span>
                      <span className="font-bold text-green-600">
                        {realityCheck.hoursCompleted} hours ✓
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">
                      {realityCheck.hoursCompleted > 0 ? 'Remaining' : 'Your VoraPrep plan'}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ~{realityCheck.hoursNeeded} hours
                    </span>
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
                
                {/* Interactive adjustments - always shown */}
                <div className="space-y-5 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Adjust your plan:
                  </p>
                  
                  {/* Exam Date Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-slate-600 dark:text-slate-400">Exam Date</label>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {examDate ? new Date(examDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      </span>
                    </div>
                    {(() => {
                      const now = Date.now();
                      const minDays = 14;
                      const maxDays = 365;
                      const _minDate = new Date(now + minDays * 86400000);
                      const currentDays = examDate
                        ? Math.round((new Date(examDate + 'T12:00:00').getTime() - now) / 86400000)
                        : 90;
                      const clampedDays = Math.max(minDays, Math.min(maxDays, currentDays));
                      const weeksOut = Math.round(clampedDays / 7);
                      return (
                        <>
                          <input
                            type="range"
                            min={Math.ceil(minDays / 7)}
                            max={Math.floor(maxDays / 7)}
                            step="1"
                            value={weeksOut}
                            onChange={(e) => {
                              const weeks = parseInt(e.target.value, 10);
                              const d = new Date(now + weeks * 7 * 86400000);
                              setExamDate(d.toISOString().split('T')[0]);
                            }}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                          <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>{Math.ceil(minDays / 7)} wks</span>
                            <span>~{Math.round(clampedDays / 7)} weeks ({Math.round(clampedDays / 30)} mo)</span>
                            <span>{Math.floor(maxDays / 7)} wks</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                  {/* Hours per Day Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-slate-600 dark:text-slate-400">Hours per day</label>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {hoursPerDay.toFixed(1)}h
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>0.5h</span>
                      <span>5h</span>
                    </div>
                  </div>
                  
                  {/* Days per Week Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-slate-600 dark:text-slate-400">Study days per week</label>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{daysPerWeek} days</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="7"
                      step="1"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>3 days</span>
                      <span>7 days</span>
                    </div>
                  </div>
                  
                  {/* Weekly total summary */}
                  <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Weekly study time</span>
                    <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                      {(hoursPerDay * daysPerWeek).toFixed(1)}h/week
                    </span>
                  </div>
                </div>
                
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
  
  // Show loading state while auth/plan is loading
  if (authLoading || planLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }
  
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
              {STEPS.filter(s => !(s === 'section' && (isSingleExamCourse || existingPlan)) && s !== 'complete').map((step) => (
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
