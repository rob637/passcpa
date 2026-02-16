/**
 * Course Selector Component
 * 
 * Dropdown/button that allows users to switch between different exam prep courses.
 * Displays current course and provides menu to switch when multiple courses available.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Clock, Sparkles, Play } from 'lucide-react';
import { Button } from './Button';
import { useToast } from './Toast';
import { useCourse } from '../../providers/CourseProvider';
import { useSubscription } from '../../services/subscription';
import { isCourseActive, ACTIVE_COURSES } from '../../courses';
import { CourseId } from '../../types/course';
import { getCourseHomePath } from '../../utils/courseNavigation';
import logger from '../../utils/logger';
import clsx from 'clsx';

/** All courses that may be shown (even if not yet available) */
const ALL_COURSES: CourseId[] = ['cpa', 'cma', 'ea', 'cia', 'cfp', 'cisa'];

/** Course display configuration */
const COURSE_DISPLAY: Record<CourseId, { 
  name: string; 
  shortName: string; 
  color: string;
  icon: string;
}> = {
  cpa: { 
    name: 'CPA Exam', 
    shortName: 'CPA', 
    color: 'bg-blue-500',
    icon: '📊',
  },
  cma: { 
    name: 'CMA Exam', 
    shortName: 'CMA', 
    color: 'bg-emerald-500',
    icon: '📈',
  },
  ea: { 
    name: 'Enrolled Agent', 
    shortName: 'EA', 
    color: 'bg-primary-500',
    icon: '🏛️',
  },
  cia: { 
    name: 'CIA Exam', 
    shortName: 'CIA', 
    color: 'bg-amber-500',
    icon: '🔍',
  },
  cfp: { 
    name: 'CFP Exam', 
    shortName: 'CFP', 
    color: 'bg-green-500',
    icon: '🌱',
  },
  cisa: { 
    name: 'CISA Exam', 
    shortName: 'CISA', 
    color: 'bg-cyan-500',
    icon: '🛡️',
  },
};

interface CourseSelectorProps {
  /** Compact mode for mobile/narrow spaces */
  compact?: boolean;
  /** Mobile header variant - shows badge + short name */
  mobileHeader?: boolean;
  /** Show "coming soon" courses */
  showComingSoon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
  compact = false,
  mobileHeader = false,
  showComingSoon = true,
  className,
}) => {
  const { courseId, setCourse } = useCourse();
  const { getExamAccess, startExamTrial } = useSubscription();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const currentDisplay = COURSE_DISPLAY[courseId];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);
  
  const handleSelect = async (id: CourseId) => {
    if (!isCourseActive(id)) return;
    
    // Check if user needs a trial started for this exam
    try {
      const access = getExamAccess(id);
      if (!access.hasAccess && access.canStartTrial) {
        const started = await startExamTrial(id);
        if (started) {
          toast.success(`Started 14-day free trial for ${COURSE_DISPLAY[id].shortName}!`);
        }
      }
    } catch (error) {
      // Don't block course switching if trial start fails
      logger.error('Error starting trial:', error);
    }
    
    // Always allow switching (soft-lock at content level, not navigation)
    setCourse(id);
    setIsOpen(false);
    navigate(getCourseHomePath(id));
  };
  
  // Filter courses to show
  const coursesToShow = showComingSoon 
    ? ALL_COURSES 
    : ALL_COURSES.filter(id => isCourseActive(id));
  
  // If only one course and it's active, don't show selector
  if (ACTIVE_COURSES.length <= 1 && !showComingSoon) {
    return null;
  }
  
  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      {/* Trigger Button */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 rounded-xl',
          compact && !mobileHeader && 'px-2 py-1.5',
          mobileHeader && 'px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 border-0',
          !compact && !mobileHeader && 'w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select course"
      >
        <span className={clsx(
          'flex items-center justify-center rounded-lg text-white text-sm font-bold',
          currentDisplay.color,
          mobileHeader ? 'w-7 h-7' : compact ? 'w-6 h-6' : 'w-8 h-8'
        )}>
          {currentDisplay.icon}
        </span>
        
        {/* Mobile header: show short name + small chevron */}
        {mobileHeader && (
          <>
            <span className="font-bold text-base text-slate-900 dark:text-slate-100">
              {currentDisplay.shortName}
            </span>
            <ChevronDown className={clsx(
              'w-4 h-4 text-slate-500 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
          </>
        )}
        
        {/* Full desktop: show name + description */}
        {!compact && !mobileHeader && (
          <>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {currentDisplay.shortName}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                {currentDisplay.name}
              </div>
            </div>
            <ChevronDown className={clsx(
              'w-4 h-4 text-slate-600 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
          </>
        )}
      </Button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={clsx(
            'absolute z-50 mt-2 w-64 rounded-xl shadow-lg',
            'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
            'overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200',
            compact ? 'left-0' : 'left-0 right-0'
          )}
          role="listbox"
          aria-label="Available courses"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Select Course
            </div>
            
            {coursesToShow.map((id) => {
              const display = COURSE_DISPLAY[id];
              const isActive = isCourseActive(id);
              const isSelected = id === courseId;
              const access = isActive ? getExamAccess(id) : null;
              
              return (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  disabled={!isActive}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150',
                    isActive
                      ? 'hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer'
                      : 'opacity-60 cursor-not-allowed',
                    isSelected && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={clsx(
                    'flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold',
                    display.color
                  )}>
                    {display.icon}
                  </span>
                  
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {display.shortName}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {display.name}
                    </div>
                  </div>
                  
                  {/* Status indicators */}
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary-600" />
                  )}
                  {!isSelected && isActive && access && (
                    <>
                      {access.isPaid && (
                        <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                      {!access.isPaid && access.isTrialing && (
                        <span className="flex items-center gap-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          {access.trialDaysRemaining}d
                        </span>
                      )}
                      {!access.isPaid && access.trialExpired && (
                        <span className="text-[10px] font-semibold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded-full">
                          Expired
                        </span>
                      )}
                      {access.canStartTrial && (
                        <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">
                          <Play className="w-3 h-3" />
                          Free Trial
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Footer for upgrade prompt */}
          {showComingSoon && (
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                Each exam includes a free 14-day trial!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSelector;
