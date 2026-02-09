import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Target,
  CheckCircle,
  Briefcase,
  DollarSign,
  Lightbulb,
  AlertTriangle,
  Clock,
  BookOpen,
  ChevronRight,
  GraduationCap,
  FileText,
  Layout,
  BookMarked,
  Calculator,
  Brain,
  ScrollText,
} from 'lucide-react';
import { useCourse } from '../../providers/CourseProvider';
import { getSectionDisplayInfo } from '../../utils/sectionUtils';
import { getStudyResources } from '../../utils/studyResources';

/**
 * ExamGuide - Consolidated page for exam information
 * 
 * Consolidates:
 * - Exam Overview (why get certified, benefits, career paths)
 * - Exam Strategy (tips, common mistakes, time management)
 * - Curriculum Overview (sections/domains table of contents)
 */
const ExamGuide: React.FC = () => {
  const { course, courseId } = useCourse();

  // Filter out strategy sections for the curriculum view
  const examSections = course.sections.filter(s => s.id !== 'PREP');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: `${course.color}20` }}
        >
          <Compass className="w-8 h-8" style={{ color: course.color }} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {course.name} Guide
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Everything you need to know to pass your exam
        </p>
      </div>

      <div className="space-y-6">
        {/* Exam Overview Section */}
        {course.examOverview && (
          <section className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Why Get {course.shortName} Certified?
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Exam overview and career benefits</p>
                </div>
              </div>
            </div>
            <div className="card-body space-y-5">
              <p className="text-slate-700 dark:text-slate-200">{course.examOverview.description}</p>
              
              {/* Benefits */}
              {course.examOverview.benefits && course.examOverview.benefits.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-600" />
                    Key Benefits
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {course.examOverview.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-success-500 mt-0.5">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Career Opportunities */}
              {course.examOverview.careerOpportunities && course.examOverview.careerOpportunities.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary-600" />
                    Career Opportunities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.examOverview.careerOpportunities.map((career, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Salary & Format */}
              <div className="grid sm:grid-cols-2 gap-4">
                {course.examOverview.averageSalary && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-success-50 dark:bg-success-900/20 border border-success-100 dark:border-success-800">
                    <DollarSign className="w-6 h-6 text-success-600" />
                    <div>
                      <span className="text-sm font-medium text-success-700 dark:text-success-400">Average Salary</span>
                      <p className="text-lg font-semibold text-success-800 dark:text-success-300">{course.examOverview.averageSalary}</p>
                    </div>
                  </div>
                )}
                
                {course.examOverview.examFormat && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
                    <FileText className="w-6 h-6 text-primary-600" />
                    <div>
                      <span className="text-sm font-medium text-primary-700 dark:text-primary-400">Exam Format</span>
                      <p className="text-sm text-primary-600 dark:text-primary-300">{course.examOverview.examFormat}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Exam Strategy Section */}
        {course.examStrategy && (
          <section className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Exam Strategy
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Tips and strategies to pass</p>
                </div>
              </div>
            </div>
            <div className="card-body space-y-5">
              {/* Key Strategies */}
              {course.examStrategy.keyStrategies && course.examStrategy.keyStrategies.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    Key Strategies
                  </h3>
                  <div className="grid gap-3">
                    {course.examStrategy.keyStrategies.map((strategy, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{strategy.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{strategy.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Study Tips */}
              {course.examStrategy.studyTips && course.examStrategy.studyTips.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary-600" />
                    Study Tips
                  </h3>
                  <ul className="space-y-2">
                    {course.examStrategy.studyTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-primary-500 mt-0.5">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Common Mistakes */}
              {course.examStrategy.commonMistakes && course.examStrategy.commonMistakes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {course.examStrategy.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-red-500 mt-0.5">⚠️</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Time Management */}
              {course.examStrategy.timeManagement && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-400">Recommended Study Time</span>
                    <p className="text-sm text-primary-600 dark:text-primary-300">{course.examStrategy.timeManagement}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Study Resources */}
        {(() => {
          const resources = getStudyResources(courseId);
          const hasResources = resources.cheatsheets.length > 0 || 
            resources.studyGuides.length > 0 || 
            resources.formulaSheets.length > 0 || 
            resources.mnemonics.length > 0 ||
            resources.references.length > 0;
          
          if (!hasResources) return null;
          
          return (
            <section className="card">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <BookMarked className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Study Resources
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Quick reference materials and memory aids
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Cheatsheets */}
                  {resources.cheatsheets.length > 0 && (
                    <Link
                      to="/learn"
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <ScrollText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          Cheatsheets
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {resources.cheatsheets.length} quick reference {resources.cheatsheets.length === 1 ? 'guide' : 'guides'}
                        </p>
                      </div>
                    </Link>
                  )}
                  
                  {/* Study Guides */}
                  {resources.studyGuides.length > 0 && (
                    <Link
                      to="/learn"
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          Study Guides
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {resources.studyGuides.length} comprehensive {resources.studyGuides.length === 1 ? 'guide' : 'guides'}
                        </p>
                      </div>
                    </Link>
                  )}
                  
                  {/* Formula Sheets */}
                  {resources.formulaSheets.length > 0 && (
                    <Link
                      to="/learn"
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          Formula Sheets
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {resources.formulaSheets.length} formula {resources.formulaSheets.length === 1 ? 'reference' : 'references'}
                        </p>
                      </div>
                    </Link>
                  )}
                  
                  {/* Mnemonics */}
                  {resources.mnemonics.length > 0 && (
                    <Link
                      to="/flashcards"
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          Mnemonics
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {resources.mnemonics.length} memory {resources.mnemonics.length === 1 ? 'aid' : 'aids'}
                        </p>
                      </div>
                    </Link>
                  )}
                  
                  {/* Quick References */}
                  {resources.references.length > 0 && (
                    <Link
                      to="/learn"
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-cyan-300 dark:hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                          Quick References
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {resources.references.length} reference {resources.references.length === 1 ? 'table' : 'tables'}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Curriculum Overview / Table of Contents */}
        <section className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Layout className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Curriculum Overview
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {examSections.length} exam {examSections.length === 1 ? 'section' : 'sections'} to master
                  </p>
                </div>
              </div>
              <Link
                to="/lessons/matrix"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View all lessons →
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {examSections.map((section) => {
                const displayInfo = getSectionDisplayInfo(section.id, courseId);
                const blueprintCount = section.blueprintAreas?.length || 0;
                
                return (
                  <Link
                    key={section.id}
                    to={`/learn?section=${section.id}`}
                    className="block p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: displayInfo?.color || course.color }}
                        >
                          {section.shortName}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                            {section.name}
                          </h3>
                          {blueprintCount > 0 && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {blueprintCount} topic {blueprintCount === 1 ? 'area' : 'areas'}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    
                    {/* Blueprint Areas Preview */}
                    {section.blueprintAreas && section.blueprintAreas.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {section.blueprintAreas.slice(0, 4).map((area, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                          >
                            {area.name.length > 25 ? area.name.substring(0, 25) + '...' : area.name}
                          </span>
                        ))}
                        {section.blueprintAreas.length > 4 && (
                          <span className="px-2 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400">
                            +{section.blueprintAreas.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-200 dark:border-primary-700">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Ready to Start?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                to="/learn"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
              >
                <BookOpen className="w-6 h-6 text-primary-600" />
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary-600">
                    Start Learning
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Begin with lessons</p>
                </div>
              </Link>
              <Link
                to="/practice"
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500 transition-colors group"
              >
                <Target className="w-6 h-6 text-amber-600" />
                <div>
                  <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary-600">
                    Practice Questions
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Test your knowledge</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExamGuide;
