/**
 * Exam Date Tracker Component
 * 
 * Becker-style per-section exam date management:
 * - Shows all CPA sections with exam dates
 * - Days remaining countdown
 * - Progress indicators
 * - Quick date entry modal
 */

import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Edit2,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { CPA_SECTIONS } from '../config/examConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { format, differenceInDays, addDays } from 'date-fns';
import clsx from 'clsx';
import { ExamSection } from '../types';

interface SectionExamDate {
  section: ExamSection;
  examDate?: Date;
  isActive: boolean;
}

interface ExamDateTrackerProps {
  compact?: boolean; // For embedding in other pages
  onSectionSelect?: (section: ExamSection) => void;
}

const ExamDateTracker: React.FC<ExamDateTrackerProps> = ({ 
  compact = false,
  onSectionSelect 
}) => {
  const { user, userProfile, refreshProfile } = useAuth();
  const [editingSection, setEditingSection] = useState<ExamSection | null>(null);
  const [dateInput, setDateInput] = useState('');
  const [saving, setSaving] = useState(false);
  
  // Get exam dates from user profile
  // Currently we only have single examDate, but this prepares for per-section dates
  const currentSection = (userProfile?.examSection || 'FAR') as ExamSection;
  const currentExamDate = userProfile?.examDate 
    ? (typeof (userProfile.examDate as { toDate?: () => Date }).toDate === 'function'
        ? (userProfile.examDate as { toDate: () => Date }).toDate()
        : new Date(userProfile.examDate as Date))
    : null;
  
  // For now, map the single exam date to the active section
  // Future: Store per-section dates in userProfile.examDates: { FAR: Date, AUD: Date, ... }
  const sectionDates: SectionExamDate[] = Object.keys(CPA_SECTIONS)
    .filter(key => !['PREP', 'BEC'].includes(key))
    .map(key => ({
      section: key as ExamSection,
      examDate: key === currentSection ? currentExamDate || undefined : undefined,
      isActive: key === currentSection,
    }));
  
  // Core sections (required)
  const coreSections = sectionDates.filter(s => ['FAR', 'AUD', 'REG'].includes(s.section));
  // Discipline sections (choose one)
  const disciplineSections = sectionDates.filter(s => ['BAR', 'ISC', 'TCP'].includes(s.section));
  
  const handleSaveDate = async (section: ExamSection) => {
    if (!user?.uid || !dateInput) return;
    
    setSaving(true);
    try {
      const newDate = new Date(dateInput);
      
      // Update Firestore - for now updating the single examDate
      // Future: Update examDates[section] = newDate
      await updateDoc(doc(db, 'users', user.uid), {
        examDate: newDate,
        examSection: section, // Also set this as active section
      });
      
      // Refresh profile to get updated data
      if (refreshProfile) {
        await refreshProfile();
      }
      
      setEditingSection(null);
      setDateInput('');
    } catch (error) {
      console.error('Error saving exam date:', error);
    }
    setSaving(false);
  };
  
  const handleSelectSection = (section: ExamSection) => {
    if (onSectionSelect) {
      onSectionSelect(section);
    }
  };
  
  const renderSectionCard = (sectionDate: SectionExamDate) => {
    const { section, examDate, isActive } = sectionDate;
    const sectionInfo = CPA_SECTIONS[section];
    const daysUntil = examDate ? differenceInDays(examDate, new Date()) : null;
    
    const isEditing = editingSection === section;
    
    return (
      <div 
        key={section}
        className={clsx(
          'rounded-xl border-2 p-4 transition-all',
          isActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800',
          !compact && 'hover:shadow-md cursor-pointer'
        )}
        onClick={() => !isEditing && handleSelectSection(section)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: sectionInfo?.color || '#6B7280' }}
            >
              {section}
            </div>
            {isActive && (
              <span className="text-xs font-medium px-2 py-0.5 bg-primary-500 text-white rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            )}
          </div>
          {!compact && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingSection(section);
                setDateInput(examDate ? format(examDate, 'yyyy-MM-dd') : '');
              }}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
        
        {/* Section Name */}
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
          {sectionInfo?.name || section}
        </h3>
        
        {/* Exam Date / Edit Form */}
        {isEditing ? (
          <div className="mt-3" onClick={e => e.stopPropagation()}>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleSaveDate(section)}
                disabled={saving || !dateInput}
                className="flex-1 px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setEditingSection(null);
                  setDateInput('');
                }}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : examDate ? (
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600 dark:text-slate-400">
                {format(examDate, 'MMMM d, yyyy')}
              </span>
            </div>
            {daysUntil !== null && (
              <div className={clsx(
                'mt-2 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2',
                daysUntil <= 7 
                  ? 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'
                  : daysUntil <= 30
                    ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400'
                    : 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
              )}>
                {daysUntil <= 0 ? (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Exam day!
                  </>
                ) : daysUntil === 1 ? (
                  <>
                    <Clock className="w-4 h-4" />
                    1 day left
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    {daysUntil} days left
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingSection(section);
            }}
            className="mt-3 w-full py-2 px-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Set exam date
          </button>
        )}
      </div>
    );
  };
  
  if (compact) {
    // Compact mode - just show active section
    const activeSection = sectionDates.find(s => s.isActive);
    if (!activeSection) return null;
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        {renderSectionCard(activeSection)}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Core Sections */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Core Sections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coreSections.map(renderSectionCard)}
        </div>
      </div>
      
      {/* Discipline Sections */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Discipline Sections <span className="text-xs font-normal text-slate-500">(choose one)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {disciplineSections.map(renderSectionCard)}
        </div>
      </div>
      
      {/* Info Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-3">
        <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
            Why set exam dates?
          </p>
          <p className="text-blue-700 dark:text-blue-300">
            Setting your exam date helps us:
          </p>
          <ul className="text-blue-700 dark:text-blue-300 mt-2 space-y-1 list-disc list-inside">
            <li>Create personalized study milestones</li>
            <li>Adjust daily plan intensity as exam approaches</li>
            <li>Show accurate "days remaining" countdowns</li>
            <li>Determine which blueprint version applies to your exam</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExamDateTracker;
