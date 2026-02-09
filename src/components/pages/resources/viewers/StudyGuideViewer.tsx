/**
 * Study Guide Viewer
 * 
 * Renders structured study guide content with
 * blueprint areas, topics, and study plans
 */

import React, { useEffect, useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Target, 
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { ResourceItem } from '../resourceConfig';

interface StudyGuideViewerProps {
  courseId: string;
  item: ResourceItem;
}

interface StudyGuideData {
  id: string;
  section: string;
  title: string;
  version?: string;
  lastUpdated?: string;
  examFormat?: {
    testlets?: number;
    mcqs?: number;
    tbs?: number;
    duration?: string;
  };
  blueprintAreas?: BlueprintArea[];
  studyPlan?: StudyWeek[];
  examTips?: string[];
  commonMistakes?: string[];
}

interface BlueprintArea {
  id: string;
  title: string;
  weight: string;
  overview: string;
  keyTopics: TopicDetail[];
  criticalFormulas?: string[];
  examTips: string[];
}

interface TopicDetail {
  name: string;
  description: string;
  keyPoints: string[];
  references?: string[];
}

interface StudyWeek {
  week: number;
  focus: string;
  topics: string[];
  hours: number;
  activities: string[];
}

export const StudyGuideViewer: React.FC<StudyGuideViewerProps> = ({ courseId, item }) => {
  const [guide, setGuide] = useState<StudyGuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadStudyGuide = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Map item IDs to study guide exports
        // IDs come from resourceConfig, need to map to actual file exports
        const guideMap: Record<string, () => Promise<unknown>> = {
          // CPA
          'cpa-sg-far': () => import(`../../../../data/cpa/study-materials/far-study-guide`).then(m => m.FAR_STUDY_GUIDE),
          'cpa-sg-aud': () => import(`../../../../data/cpa/study-materials/aud-study-guide`).then(m => m.AUD_STUDY_GUIDE),
          'cpa-sg-reg': () => import(`../../../../data/cpa/study-materials/reg-study-guide`).then(m => m.REG_STUDY_GUIDE),
          'cpa-sg-bar': () => import(`../../../../data/cpa/study-materials/bar-study-guide`).then(m => m.BAR_STUDY_GUIDE),
          // EA
          'ea-sg-see1': () => import(`../../../../data/ea/study-materials/see1-study-guide`).then(m => m.SEE1_STUDY_GUIDE),
          'ea-sg-see2': () => import(`../../../../data/ea/study-materials/see2-study-guide`).then(m => m.SEE2_STUDY_GUIDE),
          'ea-sg-see3': () => import(`../../../../data/ea/study-materials/see3-study-guide`).then(m => m.SEE3_STUDY_GUIDE),
          // CMA (uses -p1, -p2 IDs in config)
          'cma-sg-part1': () => import(`../../../../data/cma/study-materials/cma1-study-guide`).then(m => m.CMA1_STUDY_GUIDE),
          'cma-sg-part2': () => import(`../../../../data/cma/study-materials/cma2-study-guide`).then(m => m.CMA2_STUDY_GUIDE),
          'cma-sg-p1': () => import(`../../../../data/cma/study-materials/cma1-study-guide`).then(m => m.CMA1_STUDY_GUIDE),
          'cma-sg-p2': () => import(`../../../../data/cma/study-materials/cma2-study-guide`).then(m => m.CMA2_STUDY_GUIDE),
          // CIA (uses -p1, -p2, -p3 IDs in config)
          'cia-sg-part1': () => import(`../../../../data/cia/study-materials/cia1-study-guide`).then(m => m.CIA1_STUDY_GUIDE),
          'cia-sg-part2': () => import(`../../../../data/cia/study-materials/cia2-study-guide`).then(m => m.CIA2_STUDY_GUIDE),
          'cia-sg-part3': () => import(`../../../../data/cia/study-materials/cia3-study-guide`).then(m => m.CIA3_STUDY_GUIDE),
          'cia-sg-p1': () => import(`../../../../data/cia/study-materials/cia1-study-guide`).then(m => m.CIA1_STUDY_GUIDE),
          'cia-sg-p2': () => import(`../../../../data/cia/study-materials/cia2-study-guide`).then(m => m.CIA2_STUDY_GUIDE),
          'cia-sg-p3': () => import(`../../../../data/cia/study-materials/cia3-study-guide`).then(m => m.CIA3_STUDY_GUIDE),
          // CFP - single comprehensive guide
          'cfp-sg-comprehensive': () => import(`../../../../data/cfp/study-materials/cfp-study-guide`).then(m => m.CFP_COMPREHENSIVE_GUIDE),
          'cfp-sg-all': () => import(`../../../../data/cfp/study-materials/cfp-study-guide`).then(m => m.CFP_COMPREHENSIVE_GUIDE),
        };
        
        const loader = guideMap[item.id];
        if (loader) {
          const data = await loader();
          setGuide(data as StudyGuideData);
        } else {
          setError(`Study guide not found: ${item.id}`);
        }
      } catch (err) {
        console.error('Failed to load study guide:', err);
        setError('Unable to load study guide content');
      } finally {
        setLoading(false);
      }
    };

    loadStudyGuide();
  }, [courseId, item]);

  const toggleArea = (areaId: string) => {
    setExpandedAreas(prev => {
      const next = new Set(prev);
      if (next.has(areaId)) {
        next.delete(areaId);
      } else {
        next.add(areaId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'No content available'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Exam Format Overview */}
      {guide.examFormat && (
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-500" />
            Exam Format
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {guide.examFormat.duration && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {guide.examFormat.duration}
                </div>
                <div className="text-sm text-slate-500">Duration</div>
              </div>
            )}
            {guide.examFormat.mcqs && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {guide.examFormat.mcqs}
                </div>
                <div className="text-sm text-slate-500">MCQs</div>
              </div>
            )}
            {guide.examFormat.tbs && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {guide.examFormat.tbs}
                </div>
                <div className="text-sm text-slate-500">TBS</div>
              </div>
            )}
            {guide.examFormat.testlets && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {guide.examFormat.testlets}
                </div>
                <div className="text-sm text-slate-500">Testlets</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blueprint Areas */}
      {guide.blueprintAreas && guide.blueprintAreas.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            Blueprint Areas
          </h2>
          <div className="space-y-3">
            {guide.blueprintAreas.map((area) => (
              <div
                key={area.id}
                className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleArea(area.id)}
                  className="w-full p-4 flex items-center justify-between bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedAreas.has(area.id) ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {area.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {area.weight} of exam
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {area.keyTopics.length} topics
                  </span>
                </button>
                
                {expandedAreas.has(area.id) && (
                  <div className="p-4 pt-0 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {area.overview}
                    </p>
                    
                    {/* Key Topics */}
                    <div className="space-y-4">
                      {area.keyTopics.map((topic, idx) => (
                        <div key={idx} className="pl-4 border-l-2 border-primary-200 dark:border-primary-800">
                          <h4 className="font-medium text-slate-800 dark:text-slate-200">
                            {topic.name}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {topic.description}
                          </p>
                          {topic.keyPoints && topic.keyPoints.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {topic.keyPoints.map((point, i) => (
                                <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                  <span className="text-primary-500 mt-1">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Area Exam Tips */}
                    {area.examTips && area.examTips.length > 0 && (
                      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <h5 className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1">
                          <Lightbulb className="w-4 h-4" />
                          Exam Tips
                        </h5>
                        <ul className="space-y-1">
                          {area.examTips.map((tip, i) => (
                            <li key={i} className="text-sm text-amber-700 dark:text-amber-300">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Plan */}
      {guide.studyPlan && guide.studyPlan.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-500" />
            Study Plan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Week</th>
                  <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Focus</th>
                  <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Hours</th>
                  <th className="py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Topics</th>
                </tr>
              </thead>
              <tbody>
                {guide.studyPlan.map((week) => (
                  <tr key={week.week} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                      Week {week.week}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {week.focus}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      {week.hours}h
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {week.topics.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Exam Tips */}
      {guide.examTips && guide.examTips.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
            Top Exam Tips
          </h2>
          <ul className="space-y-2">
            {guide.examTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-green-700 dark:text-green-300">
                <span className="font-bold text-green-600 dark:text-green-400">{i + 1}.</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Mistakes */}
      {guide.commonMistakes && guide.commonMistakes.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-2">
            {guide.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                <span className="font-bold text-red-600 dark:text-red-400">×</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudyGuideViewer;
