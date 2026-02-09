import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { useStudy } from '../hooks/useStudy';
import { useCourse } from '../providers/CourseProvider';

// Donut chart colors matching Becker's style
const ACTIVITY_COLORS = {
  lessons: '#10b981', // emerald-500
  mcqs: '#6366f1',    // primary-500
  tbs: '#1a73e8',     // primary-600
  flashcards: '#f59e0b', // amber-500
  other: '#94a3b8',   // slate-400
};

interface StudyTimeDonutProps {
  className?: string;
}

// Mini SVG Donut Chart
const DonutChart: React.FC<{
  segments: { value: number; color: string; label: string }[];
  total: number;
  size?: number;
}> = ({ segments, total, size = 100 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  let currentOffset = 0;
  
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
        className="dark:stroke-slate-700"
      />
      
      {/* Segments */}
      {segments.map((segment, index) => {
        const segmentLength = total > 0 ? (segment.value / total) * circumference : 0;
        const offset = currentOffset;
        currentOffset += segmentLength;
        
        if (segment.value === 0) return null;
        
        return (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        );
      })}
    </svg>
  );
};

const StudyTimeCard: React.FC<StudyTimeDonutProps> = ({ className }) => {
  const { weeklyStats, todayLog } = useStudy();
  const { courseId } = useCourse();
  
  // TBS is only for CPA exam
  const hasTBS = courseId === 'cpa';
  
  // Calculate time breakdown from todayLog activities or estimate from stats
  // In a real implementation, you'd track time per activity type
  // For now, we'll estimate based on question counts
  const todayMinutes = todayLog?.studyTimeMinutes || 0;
  const weeklyMinutes = weeklyStats?.totalMinutes || 0;
  
  // Estimate breakdown (in real app, track this explicitly)
  // Adjust percentages based on whether TBS is available
  const lessonsTime = Math.round(todayMinutes * (hasTBS ? 0.3 : 0.35));
  const mcqsTime = Math.round(todayMinutes * (hasTBS ? 0.4 : 0.5));
  const tbsTime = hasTBS ? Math.round(todayMinutes * 0.2) : 0;
  const flashcardsTime = Math.round(todayMinutes * (hasTBS ? 0.1 : 0.15));
  
  // Build segments dynamically based on course
  const allSegments = [
    { value: lessonsTime, color: ACTIVITY_COLORS.lessons, label: 'Lessons' },
    { value: mcqsTime, color: ACTIVITY_COLORS.mcqs, label: 'MCQs' },
    ...(hasTBS ? [{ value: tbsTime, color: ACTIVITY_COLORS.tbs, label: 'TBS' }] : []),
    { value: flashcardsTime, color: ACTIVITY_COLORS.flashcards, label: 'Flashcards' },
  ];
  
  const segments = allSegments.filter(s => s.value > 0);
  
  // If no activity today, show placeholder
  if (todayMinutes === 0 && weeklyMinutes === 0) {
    return null; // Don't show if no study time recorded
  }
  
  const formatTime = (minutes: number): string => {
    const roundedMinutes = Math.round(minutes);
    if (roundedMinutes < 60) return `${roundedMinutes}m`;
    const hours = Math.floor(roundedMinutes / 60);
    const mins = roundedMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Link 
      to="/progress"
      className={`block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Study Time</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </div>
      
      <div className="flex items-center gap-4">
        {/* Donut Chart */}
        <div className="relative">
          <DonutChart segments={segments} total={todayMinutes || 1} size={80} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatTime(todayMinutes)}
            </span>
            <span className="text-xs text-slate-600">today</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1">
          {[
            { label: 'Lessons', color: ACTIVITY_COLORS.lessons, time: lessonsTime },
            { label: 'MCQs', color: ACTIVITY_COLORS.mcqs, time: mcqsTime },
            ...(hasTBS ? [{ label: 'TBS', color: ACTIVITY_COLORS.tbs, time: tbsTime }] : []),
            { label: 'Flashcards', color: ACTIVITY_COLORS.flashcards, time: flashcardsTime },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-300">{item.label}</span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-auto">
                {item.time}m
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Weekly total */}
      {weeklyMinutes > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm">
          <span className="text-slate-600">This week</span>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-medium">{formatTime(weeklyMinutes)}</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default StudyTimeCard;
