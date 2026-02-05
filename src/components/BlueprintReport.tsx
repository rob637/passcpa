/**
 * Blueprint Report Modal
 * 
 * Becker-style visual blueprint breakdown showing:
 * - Areas with weight percentages
 * - Performance by blueprint area
 * - Skill level distribution
 * - Comparison to target
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Target,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useStudy } from '../hooks/useStudy';
import { CPA_SECTIONS, EXAM_BLUEPRINTS } from '../config/examConfig';
import clsx from 'clsx';
import { ExamSection } from '../types';

interface BlueprintArea {
  id: string;
  name: string;
  weightRange: [number, number];
}

interface BlueprintReportProps {
  isOpen: boolean;
  onClose: () => void;
  section?: ExamSection;
}

interface AreaPerformance {
  area: string;
  name: string;
  weight: number;
  questionsAnswered: number;
  questionsCorrect: number;
  accuracy: number;
  status: 'strong' | 'developing' | 'weak' | 'not-started';
}

const BlueprintReport: React.FC<BlueprintReportProps> = ({
  isOpen,
  onClose,
  section: propSection,
}) => {
  const { userProfile } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getTopicPerformance } = useStudy() as any;
  
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const [areaPerformance, setAreaPerformance] = useState<AreaPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currentSection = propSection || (userProfile?.examSection as ExamSection) || 'FAR';
  const sectionInfo = CPA_SECTIONS[currentSection];
  
  // Load performance data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Get blueprint areas for this section from EXAM_BLUEPRINTS
        const sectionBlueprint = EXAM_BLUEPRINTS[currentSection];
        const blueprintAreas: BlueprintArea[] = sectionBlueprint?.areas || [];
        
        // Get topic performance for this section
        let topicsData: Array<{ topic?: string; id?: string; questions?: number; accuracy?: number }> = [];
        if (getTopicPerformance) {
          topicsData = await getTopicPerformance(currentSection);
        }
        
        // Calculate performance per area
        const performance: AreaPerformance[] = blueprintAreas.map((bp: BlueprintArea) => {
          // Find all topics in this blueprint area
          const areaTopics = topicsData.filter(t => 
            t.topic?.startsWith(bp.id) || 
            t.id?.startsWith(bp.id)
          );
          
          const questionsAnswered = areaTopics.reduce((sum, t) => sum + (t.questions || 0), 0);
          const questionsCorrect = areaTopics.reduce(
            (sum, t) => sum + Math.round((t.accuracy || 0) * (t.questions || 0) / 100), 
            0
          );
          const accuracy = questionsAnswered > 0 
            ? Math.round((questionsCorrect / questionsAnswered) * 100) 
            : 0;
          
          // Determine status
          let status: 'strong' | 'developing' | 'weak' | 'not-started' = 'not-started';
          if (questionsAnswered === 0) {
            status = 'not-started';
          } else if (accuracy >= 75) {
            status = 'strong';
          } else if (accuracy >= 50) {
            status = 'developing';
          } else {
            status = 'weak';
          }
          
          // Use average of weight range
          const avgWeight = (bp.weightRange[0] + bp.weightRange[1]) / 2;
          
          return {
            area: bp.id,
            name: bp.name,
            weight: avgWeight,
            questionsAnswered,
            questionsCorrect,
            accuracy,
            status,
          };
        });
        
        setAreaPerformance(performance);
      } catch (error) {
        console.error('Error loading blueprint data:', error);
      }
      setLoading(false);
    };
    
    if (isOpen) {
      loadData();
    }
  }, [isOpen, currentSection, getTopicPerformance]);
  
  // Calculate overall stats
  const overallAccuracy = areaPerformance.length > 0
    ? Math.round(
        areaPerformance.reduce((sum, a) => sum + a.accuracy * a.weight, 0) / 
        areaPerformance.reduce((sum, a) => sum + a.weight, 0)
      )
    : 0;
  
  const strongAreas = areaPerformance.filter(a => a.status === 'strong').length;
  const weakAreas = areaPerformance.filter(a => a.status === 'weak').length;
  const totalQuestions = areaPerformance.reduce((sum, a) => sum + a.questionsAnswered, 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div 
          className="p-6 text-white"
          style={{ backgroundColor: sectionInfo?.color || '#2563EB' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Blueprint Report</h2>
                <p className="text-white/80 text-sm">
                  {sectionInfo?.name || currentSection} Exam Blueprint Analysis
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{overallAccuracy}%</div>
              <div className="text-xs text-white/70">Weighted Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{strongAreas}</div>
              <div className="text-xs text-white/70">Strong Areas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-amber-300">{weakAreas}</div>
              <div className="text-xs text-white/70">Needs Work</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{totalQuestions}</div>
              <div className="text-xs text-white/70">Questions Done</div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Legend */}
              <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-success-500" />
                  <span>Strong (75%+)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-warning-500" />
                  <span>Developing (50-74%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-error-500" />
                  <span>Weak (&lt;50%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-slate-300" />
                  <span>Not Started</span>
                </div>
              </div>
              
              {/* Blueprint Areas */}
              {areaPerformance.map((area) => (
                <div 
                  key={area.area}
                  className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedArea(expandedArea === area.area ? null : area.area)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    {/* Status Indicator */}
                    <div className={clsx(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      area.status === 'strong' && 'bg-success-100 dark:bg-success-900/30',
                      area.status === 'developing' && 'bg-warning-100 dark:bg-warning-900/30',
                      area.status === 'weak' && 'bg-error-100 dark:bg-error-900/30',
                      area.status === 'not-started' && 'bg-slate-100 dark:bg-slate-700'
                    )}>
                      {area.status === 'strong' ? (
                        <CheckCircle className="w-5 h-5 text-success-600" />
                      ) : area.status === 'developing' ? (
                        <TrendingUp className="w-5 h-5 text-warning-600" />
                      ) : area.status === 'weak' ? (
                        <AlertTriangle className="w-5 h-5 text-error-600" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                    
                    {/* Area Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {area.area}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {area.name}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {area.questionsAnswered} questions answered • {area.weight}% of exam
                      </div>
                    </div>
                    
                    {/* Accuracy Display */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={clsx(
                          'text-2xl font-bold',
                          area.status === 'strong' && 'text-success-600',
                          area.status === 'developing' && 'text-warning-600',
                          area.status === 'weak' && 'text-error-600',
                          area.status === 'not-started' && 'text-slate-600'
                        )}>
                          {area.questionsAnswered > 0 ? `${area.accuracy}%` : '—'}
                        </div>
                        <div className="text-xs text-slate-600">Accuracy</div>
                      </div>
                      
                      {/* Weight Bar */}
                      <div className="w-24 hidden sm:block">
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={clsx(
                              'h-full rounded-full',
                              area.status === 'strong' && 'bg-success-500',
                              area.status === 'developing' && 'bg-warning-500',
                              area.status === 'weak' && 'bg-error-500',
                              area.status === 'not-started' && 'bg-slate-300'
                            )}
                            style={{ width: `${area.accuracy}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-600 text-center mt-1">
                          Target: 75%
                        </div>
                      </div>
                      
                      {expandedArea === area.area ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                  </button>
                  
                  {/* Expanded Details */}
                  {expandedArea === area.area && (
                    <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {area.questionsAnswered}
                          </div>
                          <div className="text-xs text-slate-600">Total Answered</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-success-600">
                            {area.questionsCorrect}
                          </div>
                          <div className="text-xs text-slate-600">Correct</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-error-600">
                            {area.questionsAnswered - area.questionsCorrect}
                          </div>
                          <div className="text-xs text-slate-600">Incorrect</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-primary-600">
                            {area.weight}%
                          </div>
                          <div className="text-xs text-slate-600">Exam Weight</div>
                        </div>
                      </div>
                      
                      {/* Recommendation */}
                      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-start gap-3">
                        <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          {area.status === 'strong' ? (
                            <span className="text-primary-700 dark:text-primary-300">
                              <strong>Great work!</strong> You're performing well in this area. 
                              Consider doing occasional review to maintain your skills.
                            </span>
                          ) : area.status === 'developing' ? (
                            <span className="text-primary-700 dark:text-primary-300">
                              <strong>Making progress!</strong> Focus on the topics you're missing. 
                              Try using flashcards to reinforce key concepts.
                            </span>
                          ) : area.status === 'weak' ? (
                            <span className="text-primary-700 dark:text-primary-300">
                              <strong>Priority area.</strong> This area needs attention. 
                              Review the lessons first, then practice more questions.
                            </span>
                          ) : (
                            <span className="text-primary-700 dark:text-primary-300">
                              <strong>Get started!</strong> You haven't practiced this area yet. 
                              It's worth {area.weight}% of the exam, so don't skip it!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Target className="w-4 h-4" />
              <span>Target: 75% accuracy in each area for passing readiness</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintReport;
