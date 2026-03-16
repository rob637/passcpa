/**
 * StudyPlanCTA - Call to Action for creating a study plan
 * 
 * Displayed on the Home page when the user has not set up a study plan.
 * Encourages users to create a personalized roadmap.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Calendar, Target, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import { useCourse } from '../providers/CourseProvider';
import clsx from 'clsx';

interface StudyPlanCTAProps {
  className?: string;
  compact?: boolean;
}

export const StudyPlanCTA: React.FC<StudyPlanCTAProps> = ({ 
  className,
  compact = false,
}) => {
  const navigate = useNavigate();
  const { course } = useCourse();
  
  const courseName = course?.shortName || 'your exam';
  
  const handleCreatePlan = () => {
    navigate('/study-plan/setup');
  };
  
  if (compact) {
    // Compact version for sidebar or smaller spaces
    return (
      <button
        onClick={handleCreatePlan}
        className={clsx(
          'w-full p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white text-left',
          'hover:from-primary-600 hover:to-primary-700 transition-all duration-200',
          'shadow-lg hover:shadow-xl',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Map className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Create Your Study Plan</p>
            <p className="text-sm text-primary-100">Get a personalized roadmap</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary-200" />
        </div>
      </button>
    );
  }
  
  // Full CTA card
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-primary-500 via-primary-600 to-indigo-700',
        'p-6 text-white shadow-xl',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Map className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">Create Your VoraPrep Study Plan</h3>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <p className="text-primary-100">
              Get a personalized roadmap to pass {courseName}
            </p>
          </div>
        </div>
        
        {/* Benefits list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span>Diagnostic assessment to find weak areas</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span>Week-by-week curriculum for your schedule</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span>Daily activities optimized for your exam</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Progress tracking & honest feedback</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={handleCreatePlan}
          className="w-full flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-6 rounded-xl shadow-lg transition-colors"
        >
          <span>Create My Study Plan</span>
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {/* Social proof (optional) */}
        <p className="text-center text-xs text-primary-200 mt-4">
          Join thousands of candidates with structured study plans
        </p>
      </div>
    </div>
  );
};

export default StudyPlanCTA;
