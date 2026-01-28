import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Lock,
  PlayCircle,
  Search,
  GraduationCap,
  Layout,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { CPA_SECTIONS } from '../../config/examConfig';
import { fetchLessonsBySection } from '../../services/lessonService';
import clsx from 'clsx';
import { Lesson, Difficulty, ExamSection } from '../../types';

interface AreaDefinition {
  id: string;
  title: string;
  shortTitle: string;
}

interface AreaMap {
  [key: string]: AreaDefinition[];
}

interface DisplayLesson {
  id: string;
  title: string;
  duration: number;
  difficulty: Difficulty;
  completed: boolean;
}

interface GroupedArea extends AreaDefinition {
  lessons: DisplayLesson[];
}

// Group lessons by topic area for display
const groupLessonsByArea = (lessons: Lesson[], completedLessons: Set<string>): GroupedArea[] => {
  // Create area groupings based on lesson topics
  const areaMap: AreaMap = {
    PREP: [
      { id: 'prep-intro', title: 'Understanding the 2026 CPA Exam', shortTitle: 'Intro' },
      { id: 'prep-mcq', title: 'MCQ Strategy', shortTitle: 'MCQ' },
      { id: 'prep-tbs', title: 'TBS Strategy', shortTitle: 'TBS' },
      { id: 'prep-wc', title: 'Written Communication (TCP/BAR)', shortTitle: 'Writing' },
      { id: 'prep-planning', title: 'Study Planning', shortTitle: 'Planning' },
      { id: 'prep-day', title: 'Test Day & Mental Game', shortTitle: 'Test Day' },
    ],
    FAR: [
      { id: 'far-conceptual', title: 'Conceptual Framework & Standard Setting', shortTitle: 'Conceptual' },
      { id: 'far-accounts', title: 'Financial Statement Accounts', shortTitle: 'Accounts' },
      { id: 'far-transactions', title: 'Transactions', shortTitle: 'Transactions' },
      { id: 'far-govt', title: 'State & Local Government', shortTitle: 'Govt' },
      { id: 'far-nfp', title: 'Not-for-Profit Entities', shortTitle: 'NFP' },
    ],
    AUD: [
      { id: 'aud-ethics', title: 'Ethics & Professional Responsibilities', shortTitle: 'Ethics' },
      { id: 'aud-risk', title: 'Risk Assessment & Planning', shortTitle: 'Risk' },
      { id: 'aud-evidence', title: 'Performing Procedures & Evidence', shortTitle: 'Evidence' },
      { id: 'aud-reporting', title: 'Forming Conclusions & Reporting', shortTitle: 'Reporting' },
    ],
    REG: [
      { id: 'reg-ethics', title: 'Ethics & Federal Tax Procedures', shortTitle: 'Procedures' },
      { id: 'reg-law', title: 'Business Law', shortTitle: 'Business Law' },
      { id: 'reg-individual', title: 'Federal Taxation of Individuals', shortTitle: 'Individual' },
      { id: 'reg-entity', title: 'Federal Taxation of Entities', shortTitle: 'Entities' },
    ],
    BAR: [
      { id: 'bar-combinations', title: 'Business Combinations & Consolidations', shortTitle: 'Combinations' },
      { id: 'bar-tech', title: 'Technical Accounting', shortTitle: 'Technical' },
      { id: 'bar-govt', title: 'State & Local Government (Advanced)', shortTitle: 'Adv Govt' },
      { id: 'bar-analysis', title: 'Financial Analysis & Planning', shortTitle: 'Analysis' },
    ],
    ISC: [
      { id: 'isc-systems', title: 'Information Systems & Data Management', shortTitle: 'Systems' },
      { id: 'isc-security', title: 'Security, Confidentiality & Privacy', shortTitle: 'Security' },
      { id: 'isc-soc', title: 'SOC Engagements', shortTitle: 'SOC' },
    ],
    TCP: [
      { id: 'tcp-individual', title: 'Individual Tax Planning', shortTitle: 'Individual' },
      { id: 'tcp-entity', title: 'Entity Tax Planning', shortTitle: 'Entity' },
      { id: 'tcp-property', title: 'Property Transactions', shortTitle: 'Property' },
      { id: 'tcp-estates', title: 'Gift & Estate Tax', shortTitle: 'Estate' },
    ],
  };

  // Fall back to generic groupings for sections without specific areas
  const defaultAreas: AreaDefinition[] = [
    { id: 'area-1', title: 'Core Concepts', shortTitle: 'Core' },
    { id: 'area-2', title: 'Advanced Topics', shortTitle: 'Advanced' },
  ];

  const section = (lessons[0]?.section?.toUpperCase() || 'FAR') as string;
  const areas = areaMap[section] || defaultAreas;

  // Distribute lessons across areas based on order
  const lessonsPerArea = Math.ceil(lessons.length / areas.length);
  
  return areas.map((area, areaIndex) => {
    const startIndex = areaIndex * lessonsPerArea;
    const areaLessons = lessons.slice(startIndex, startIndex + lessonsPerArea);
    
    return {
      ...area,
      lessons: areaLessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        difficulty: lesson.difficulty,
        completed: completedLessons.has(lesson.id),
      })),
    };
  }).filter(area => area.lessons.length > 0);
};

const Lessons: React.FC = () => {
  const { userProfile } = useAuth();
  const { getLessonProgress } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [rawLessons, setRawLessons] = useState<Lesson[]>([]);

  // Cast to ExamSection if needed, or rely on string compatibility with fallback
  const currentSection = (userProfile?.examSection || 'FAR') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];
  
  // Fetch lessons from Firestore
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessons = await fetchLessonsBySection(currentSection);
        setRawLessons(lessons);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, [currentSection]);
  
  // Fetch completed lessons from Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        if (getLessonProgress) {
          const progress = await getLessonProgress();
          const completed = new Set(
            Object.entries(progress || {})
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter(([, data]: [string, any]) => data.status === 'completed')
              .map(([lessonId]) => lessonId)
          );
          setCompletedLessons(completed);
        }
      } catch (error) {
        console.error('Error fetching lesson progress:', error);
      }
      setLoading(false);
    };
    
    fetchProgress();
  }, [getLessonProgress, currentSection]);

  // Group lessons into areas with completion status
  const lessonAreas = groupLessonsByArea(rawLessons, completedLessons);

  // Filter lessons based on search
  const filteredAreas = lessonAreas
    .map((area) => ({
      ...area,
      lessons: area.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((area) => selectedArea === null || area.id === selectedArea)
    .filter((area) => searchQuery === '' || area.lessons.length > 0);

  // Calculate stats
  const totalLessons = lessonAreas.reduce((acc, area) => acc + area.lessons.length, 0);
  const completedCount = lessonAreas.reduce(
    (acc, area) => acc + area.lessons.filter((l) => l.completed).length,
    0
  );
  const totalDuration = lessonAreas.reduce(
    (acc, area) => acc + area.lessons.reduce((a, l) => a + (l.duration || 30), 0),
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-slate-200 rounded-xl w-1/3" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-slate-200 rounded-xl" />
            <div className="h-24 bg-slate-200 rounded-xl" />
            <div className="h-24 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-64 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: sectionInfo?.color || '#2563EB' }}
            >
              {sectionInfo?.shortName || currentSection}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lessons</h1>
              <p className="text-slate-600 dark:text-slate-400">{sectionInfo?.name || currentSection}</p>
            </div>
          </div>
          <Link 
            to="/lessons/matrix" 
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Study Guide</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {completedCount}/{totalLessons}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Completed</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {progressPercent}%
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Progress</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {Math.round(totalDuration / 60)}h
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Total Time</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <select
            value={selectedArea || ''}
            onChange={(e) => setSelectedArea(e.target.value || null)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="">All Areas</option>
            {lessonAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.shortTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lesson Areas */}
      <div className="space-y-6">
        {filteredAreas.map((area, areaIndex) => {
          const areaCompleted = area.lessons.filter((l) => l.completed).length;
          const areaProgress = area.lessons.length > 0 
            ? Math.round((areaCompleted / area.lessons.length) * 100) 
            : 0;

          return (
            <div key={area.id} className="card">
              {/* Area Header */}
              <div className="card-header">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        Area {areaIndex + 1}
                      </span>
                      {areaProgress === 100 && <CheckCircle className="w-4 h-4 text-success-500" />}
                    </div>
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{area.title}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{areaProgress}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {areaCompleted}/{area.lessons.length}
                    </div>
                  </div>
                </div>
                <div className="mt-3 progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${areaProgress}%` }} />
                </div>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {area.lessons.map((lesson, lessonIndex) => {
                  const isLocked = false; // Can implement prerequisite logic
                  const isNext =
                    !lesson.completed &&
                    area.lessons.slice(0, lessonIndex).every((l) => l.completed);

                  return (
                    <Link
                      key={lesson.id}
                      to={isLocked ? '#' : `/lessons/${lesson.id}`}
                      className={clsx(
                        'flex items-center gap-4 p-4 transition-colors',
                        isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50',
                        isNext && 'bg-primary-50 dark:bg-primary-900/20'
                      )}
                    >
                      {/* Status Icon */}
                      <div
                        className={clsx(
                          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                          lesson.completed && 'bg-success-100 dark:bg-success-900/30',
                          isNext && !lesson.completed && 'bg-primary-100 dark:bg-primary-900/30',
                          !lesson.completed && !isNext && 'bg-slate-100 dark:bg-slate-700'
                        )}
                      >
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-slate-400" />
                        ) : lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                        ) : isNext ? (
                          <PlayCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={clsx(
                            'font-medium truncate',
                            lesson.completed ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'
                          )}
                        >
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.duration || 30} min
                          </span>
                          {lesson.difficulty && (
                            <span className={clsx(
                              'px-2 py-0.5 rounded text-xs font-medium',
                              lesson.difficulty === 'beginner' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                              lesson.difficulty === 'intermediate' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                              lesson.difficulty === 'advanced' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            )}>
                              {lesson.difficulty}
                            </span>
                          )}
                          {isNext && <span className="text-primary-600 dark:text-primary-400 font-medium">Up Next</span>}
                        </div>
                      </div>

                      {/* Arrow */}
                      {!isLocked && (
                        <ChevronRight
                          className={clsx(
                            'w-5 h-5 flex-shrink-0',
                            lesson.completed ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'
                          )}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAreas.length === 0 && rawLessons.length > 0 && (
        <div className="card p-8 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">No lessons found</h3>
          <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* No lessons for section */}
      {rawLessons.length === 0 && (
        <div className="card p-8 text-center">
          <GraduationCap className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Lessons Coming Soon
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Lessons for {sectionInfo?.name || currentSection} are being prepared. 
            In the meantime, try practice questions!
          </p>
          <Link to="/practice" className="btn-primary mt-4 inline-block">
            Practice Questions
          </Link>
        </div>
      )}
    </div>
  );
};

export default Lessons;
