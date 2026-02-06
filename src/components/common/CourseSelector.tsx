/**
 * Course Selector Component
 * 
 * Dropdown/button that allows users to switch between different exam prep courses.
 * Displays current course and provides menu to switch when multiple courses available.
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, GraduationCap, Lock, Sparkles } from 'lucide-react';
import { useCourse } from '../../providers/CourseProvider';
import { isCourseActive, ACTIVE_COURSES } from '../../courses';
import { CourseId } from '../../types/course';
import clsx from 'clsx';

/** All courses that may be shown (even if not yet available) */
const ALL_COURSES: CourseId[] = ['cpa', 'cma', 'ea', 'cia'];

/** Course display configuration */
const COURSE_DISPLAY: Record<CourseId, { 
  name: string; 
  shortName: string; 
  color: string;
  icon: string;
  comingSoon?: boolean;
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
    comingSoon: true,
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
    comingSoon: true,
  },
};

interface CourseSelectorProps {
  /** Compact mode for mobile/narrow spaces */
  compact?: boolean;
  /** Show "coming soon" courses */
  showComingSoon?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
  compact = false,
  showComingSoon = true,
  className,
}) => {
  const { courseId, setCourse, userCourses } = useCourse();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  const handleSelect = (id: CourseId) => {
    if (isCourseActive(id) && userCourses.includes(id)) {
      setCourse(id);
      setIsOpen(false);
    }
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 rounded-xl transition-all duration-200',
          'hover:bg-slate-100 dark:hover:bg-slate-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          compact 
            ? 'px-2 py-1.5' 
            : 'w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select course"
      >
        <span className={clsx(
          'flex items-center justify-center rounded-lg text-white text-sm font-bold',
          currentDisplay.color,
          compact ? 'w-6 h-6' : 'w-8 h-8'
        )}>
          {currentDisplay.icon}
        </span>
        
        {!compact && (
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
      </button>
      
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
              const hasAccess = userCourses.includes(id);
              const isSelected = id === courseId;
              const isAvailable = isActive && hasAccess;
              
              return (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  disabled={!isAvailable}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150',
                    isAvailable 
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
                  {!isActive && display.comingSoon && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      Soon
                    </span>
                  )}
                  {isActive && !hasAccess && (
                    <span className="flex items-center gap-1 text-slate-600">
                      <Lock className="w-4 h-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Footer for upgrade prompt */}
          {showComingSoon && (
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <GraduationCap className="w-3.5 h-3.5 inline mr-1" />
                More exam preps coming soon! Get notified when CMA, EA, and CIA launch.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSelector;
