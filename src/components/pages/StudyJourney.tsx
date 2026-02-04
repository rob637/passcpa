/**
 * Study Journey Component
 * 
 * Becker-inspired study path showing:
 * - Units (F1, F2, F3, etc.) with content counts
 * - Mini Exams between units
 * - Progress tracking per unit
 * - Clear progression path
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  Target,
  FileText,
  ClipboardCheck,
  Trophy,
  Lock,
  Zap,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CPA_SECTIONS } from '../../config/examConfig';
import { fetchLessonsBySection } from '../../services/lessonService';
import { getQuestionStats } from '../../services/questionService';
import { getTBSCount } from '../../services/tbsService';
import clsx from 'clsx';
import { ExamSection, Lesson } from '../../types';
import logger from '../../utils/logger';

// Study unit structure (like Becker's F1, F2, etc.)
interface StudyUnit {
  id: string;
  name: string;
  type: 'content' | 'exam';
  lessons: Lesson[];
  mcqCount: number;
  tbsCount: number;
  completed: boolean;
  progress: number;
  locked: boolean;
}

// Unit definitions for each section (mapping to blueprint areas)
const UNIT_DEFINITIONS: Record<ExamSection, { id: string; name: string; blueprintPrefix: string }[]> = {
  FAR: [
    { id: 'F1', name: 'Conceptual Framework', blueprintPrefix: 'FAR-I' },
    { id: 'F2', name: 'Financial Statement Accounts', blueprintPrefix: 'FAR-II' },
    { id: 'F3', name: 'Transactions', blueprintPrefix: 'FAR-III' },
    { id: 'F4', name: 'State & Local Government', blueprintPrefix: 'FAR-IV' },
    { id: 'F5', name: 'Not-for-Profit Entities', blueprintPrefix: 'FAR-V' },
  ],
  AUD: [
    { id: 'A1', name: 'Ethics & Professional Responsibilities', blueprintPrefix: 'AUD-I' },
    { id: 'A2', name: 'Risk Assessment & Planning', blueprintPrefix: 'AUD-II' },
    { id: 'A3', name: 'Performing Procedures & Evidence', blueprintPrefix: 'AUD-III' },
    { id: 'A4', name: 'Forming Conclusions & Reporting', blueprintPrefix: 'AUD-IV' },
  ],
  REG: [
    { id: 'R1', name: 'Ethics & Federal Tax Procedures', blueprintPrefix: 'REG-I' },
    { id: 'R2', name: 'Business Law', blueprintPrefix: 'REG-II' },
    { id: 'R3', name: 'Federal Taxation of Property', blueprintPrefix: 'REG-III' },
    { id: 'R4', name: 'Federal Taxation of Individuals', blueprintPrefix: 'REG-IV' },
    { id: 'R5', name: 'Federal Taxation of Entities', blueprintPrefix: 'REG-V' },
  ],
  BAR: [
    { id: 'B1', name: 'Business Analysis', blueprintPrefix: 'BAR-I' },
    { id: 'B2', name: 'Technical Accounting', blueprintPrefix: 'BAR-II' },
    { id: 'B3', name: 'State & Local Government', blueprintPrefix: 'BAR-III' },
    { id: 'B4', name: 'Not-for-Profit Accounting', blueprintPrefix: 'BAR-IV' },
    { id: 'B5', name: 'Financial Management', blueprintPrefix: 'BAR-V' },
  ],
  ISC: [
    { id: 'I1', name: 'IT Governance & Risk', blueprintPrefix: 'ISC-I' },
    { id: 'I2', name: 'Security & Controls', blueprintPrefix: 'ISC-II' },
    { id: 'I3', name: 'SOC Engagements', blueprintPrefix: 'ISC-III' },
    { id: 'I4', name: 'Data Management', blueprintPrefix: 'ISC-IV' },
  ],
  TCP: [
    { id: 'T1', name: 'Tax Compliance', blueprintPrefix: 'TCP-I' },
    { id: 'T2', name: 'Individual Tax Planning', blueprintPrefix: 'TCP-II' },
    { id: 'T3', name: 'Entity Tax Planning', blueprintPrefix: 'TCP-III' },
    { id: 'T4', name: 'Property Transactions', blueprintPrefix: 'TCP-IV' },
    { id: 'T5', name: 'Gift & Estate Tax', blueprintPrefix: 'TCP-V' },
  ],
  PREP: [],
  BEC: [],
};

const StudyJourney: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { getLessonProgress } = useStudy();
  const { courseId } = useCourse();
  
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState<StudyUnit[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [contentCounts, setContentCounts] = useState({ mcq: 0, tbs: 0 });
  
  const currentSection = (userProfile?.examSection || 'FAR') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];
  const unitDefs = UNIT_DEFINITIONS[currentSection] || [];
  
  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch lessons and counts in parallel
        const [lessons, questionStats, tbsCount, lessonProgress] = await Promise.all([
          fetchLessonsBySection(currentSection, courseId),
          getQuestionStats(),
          getTBSCount(currentSection),
          getLessonProgress ? getLessonProgress() : Promise.resolve({}),
        ]);
        
        setContentCounts({
          mcq: questionStats.bySection[currentSection] || 0,
          tbs: tbsCount,
        });
        
        // Get completed lessons
        const completed = new Set(
          Object.entries(lessonProgress || {})
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter(([, data]: [string, any]) => data.status === 'completed' || data.completedAt)
            .map(([lessonId]) => lessonId)
        );
        setCompletedLessons(completed);
        
        // Distribute lessons across units
        const lessonsPerUnit = Math.ceil(lessons.length / unitDefs.length);
        const mcqPerUnit = Math.ceil((questionStats.bySection[currentSection] || 0) / unitDefs.length);
        const tbsPerUnit = Math.ceil(tbsCount / unitDefs.length);
        
        const builtUnits: StudyUnit[] = [];
        let previousUnitComplete = true;
        
        unitDefs.forEach((def, index) => {
          const startIndex = index * lessonsPerUnit;
          const unitLessons = lessons.slice(startIndex, startIndex + lessonsPerUnit);
          const completedInUnit = unitLessons.filter(l => completed.has(l.id)).length;
          const progress = unitLessons.length > 0 ? Math.round((completedInUnit / unitLessons.length) * 100) : 0;
          const isComplete = progress === 100;
          
          // Content unit
          builtUnits.push({
            id: def.id,
            name: def.name,
            type: 'content',
            lessons: unitLessons,
            mcqCount: mcqPerUnit,
            tbsCount: tbsPerUnit,
            completed: isComplete,
            progress,
            locked: !previousUnitComplete && index > 0, // Lock if previous not done
          });
          
          // Add mini exam after every 2 units (like Becker)
          if ((index + 1) % 2 === 0 && index < unitDefs.length - 1) {
            const examNum = Math.ceil((index + 1) / 2);
            builtUnits.push({
              id: `mini-exam-${examNum}`,
              name: `Mini Exam ${examNum}`,
              type: 'exam',
              lessons: [],
              mcqCount: 20,
              tbsCount: 2,
              completed: false, // Would track from exam history
              progress: 0,
              locked: !isComplete,
            });
          }
          
          previousUnitComplete = isComplete;
        });
        
        // Add final exam
        builtUnits.push({
          id: 'simulated-exam',
          name: 'Full Simulated Exam',
          type: 'exam',
          lessons: [],
          mcqCount: 66,
          tbsCount: 8,
          completed: false,
          progress: 0,
          locked: builtUnits.filter(u => u.type === 'content').some(u => !u.completed),
        });
        
        setUnits(builtUnits);
        
        // Auto-expand first incomplete unit
        const firstIncomplete = builtUnits.find(u => u.type === 'content' && !u.completed && !u.locked);
        if (firstIncomplete) {
          setExpandedUnit(firstIncomplete.id);
        }
        
      } catch (error) {
        logger.error('Error loading study journey:', error);
      }
      setLoading(false);
    };
    
    loadData();
  }, [currentSection, courseId, getLessonProgress, unitDefs.length]);
  
  // Calculate overall progress
  const contentUnits = units.filter(u => u.type === 'content');
  const totalLessons = contentUnits.reduce((acc, u) => acc + u.lessons.length, 0);
  const completedCount = contentUnits.reduce(
    (acc, u) => acc + u.lessons.filter(l => completedLessons.has(l.id)).length,
    0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: sectionInfo?.color || '#2563EB' }}
          >
            {sectionInfo?.shortName || currentSection}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Study Journey
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {sectionInfo?.name || currentSection}
            </p>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{overallProgress}%</div>
                <div className="text-xs text-slate-600">Complete</div>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <BookOpen className="w-4 h-4" />
                  {totalLessons} Lessons
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <FileText className="w-4 h-4" />
                  {contentCounts.mcq} MCQs
                </div>
                <div className="flex items-center gap-1 text-primary-600">
                  <ClipboardCheck className="w-4 h-4" />
                  {contentCounts.tbs} TBS
                </div>
              </div>
            </div>
            <Link
              to="/progress"
              className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <BarChart3 className="w-4 h-4" />
              View Stats
            </Link>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Study Path */}
      <div className="space-y-3">
        {units.map((unit, index) => {
          const isExpanded = expandedUnit === unit.id;
          const isExam = unit.type === 'exam';
          
          return (
            <div key={unit.id} className="relative">
              {/* Connection Line */}
              {index > 0 && (
                <div className="absolute left-7 -top-3 w-0.5 h-3 bg-slate-200 dark:bg-slate-700" />
              )}
              
              {isExam ? (
                /* Exam Unit */
                <button
                  onClick={() => {
                    if (!unit.locked) {
                      navigate('/exam-simulator');
                    }
                  }}
                  disabled={unit.locked}
                  className={clsx(
                    'w-full card p-4 flex items-center gap-4 transition-all',
                    unit.locked
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-md cursor-pointer',
                    unit.completed && 'ring-2 ring-success-500'
                  )}
                >
                  <div className={clsx(
                    'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0',
                    unit.locked
                      ? 'bg-slate-100 dark:bg-slate-800'
                      : unit.completed
                        ? 'bg-success-100 dark:bg-success-900/30'
                        : 'bg-orange-100 dark:bg-orange-900/30'
                  )}>
                    {unit.locked ? (
                      <Lock className="w-6 h-6 text-slate-400" />
                    ) : unit.completed ? (
                      <Trophy className="w-6 h-6 text-success-600" />
                    ) : (
                      <Target className="w-6 h-6 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {unit.name}
                    </div>
                    <div className="text-sm text-slate-600 flex items-center gap-2">
                      <span>{unit.mcqCount} MCQs</span>
                      <span>·</span>
                      <span>{unit.tbsCount} TBS</span>
                    </div>
                  </div>
                  {!unit.locked && <ChevronRight className="w-5 h-5 text-slate-400" />}
                </button>
              ) : (
                /* Content Unit */
                <div className={clsx(
                  'card overflow-hidden transition-all',
                  unit.completed && 'ring-2 ring-success-500',
                  unit.locked && 'opacity-50'
                )}>
                  {/* Unit Header */}
                  <button
                    onClick={() => !unit.locked && setExpandedUnit(isExpanded ? null : unit.id)}
                    disabled={unit.locked}
                    className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className={clsx(
                      'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg',
                      unit.completed
                        ? 'bg-success-500'
                        : unit.locked
                          ? 'bg-slate-400'
                          : 'bg-primary-500'
                    )}>
                      {unit.locked ? (
                        <Lock className="w-6 h-6" />
                      ) : unit.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        unit.id
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {unit.id} · {unit.name}
                        </span>
                        {unit.progress > 0 && unit.progress < 100 && (
                          <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <span>{unit.lessons.length} Lessons</span>
                        <span>·</span>
                        <span>{unit.mcqCount} MCQs</span>
                        <span>·</span>
                        <span>{unit.tbsCount} TBS</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {unit.progress}%
                        </div>
                      </div>
                      {!unit.locked && (
                        <ChevronDown className={clsx(
                          'w-5 h-5 text-slate-400 transition-transform',
                          isExpanded && 'rotate-180'
                        )} />
                      )}
                    </div>
                  </button>
                  
                  {/* Unit Progress Bar */}
                  <div className="px-4 pb-2">
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full transition-all',
                          unit.completed ? 'bg-success-500' : 'bg-primary-500'
                        )}
                        style={{ width: `${unit.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Expanded Lessons */}
                  {isExpanded && !unit.locked && (
                    <div className="border-t border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                      {unit.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = completedLessons.has(lesson.id);
                        const isNext = !isCompleted && 
                          unit.lessons.slice(0, lessonIndex).every(l => completedLessons.has(l.id));
                        
                        return (
                          <Link
                            key={lesson.id}
                            to={`/lessons/${lesson.id}`}
                            className={clsx(
                              'flex items-center gap-3 p-3 pl-8 transition-colors',
                              'hover:bg-slate-50 dark:hover:bg-slate-700/50',
                              isNext && 'bg-primary-50 dark:bg-primary-900/10'
                            )}
                          >
                            <div className={clsx(
                              'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                              isCompleted
                                ? 'bg-success-100 dark:bg-success-900/30'
                                : isNext
                                  ? 'bg-primary-100 dark:bg-primary-900/30'
                                  : 'bg-slate-100 dark:bg-slate-700'
                            )}>
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-success-600" />
                              ) : isNext ? (
                                <PlayCircle className="w-4 h-4 text-primary-600" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={clsx(
                                'font-medium truncate text-sm',
                                isCompleted ? 'text-slate-600' : 'text-slate-900 dark:text-slate-100'
                              )}>
                                {lesson.title}
                              </div>
                              <div className="text-xs text-slate-400">
                                {lesson.duration || 30} min
                              </div>
                            </div>
                            {isNext && (
                              <span className="text-xs text-primary-600 font-medium flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                Next
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                          </Link>
                        );
                      })}
                      
                      {/* Practice This Unit Button */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50">
                        <Link
                          to={`/practice?blueprintArea=${UNIT_DEFINITIONS[currentSection]?.[units.indexOf(unit)]?.blueprintPrefix || ''}`}
                          className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <Target className="w-4 h-4" />
                          Practice {unit.id} Questions
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudyJourney;
