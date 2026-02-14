/**
 * Strategy Page
 * 
 * Comprehensive exam strategy page using shared template.
 * Content is pulled from resourceConfig.ts per course.
 * 
 * Sections:
 * - Exam Structure (sections, timing, question types)
 * - Time Management strategies
 * - Question type strategies (MCQ, TBS, Essay, etc.)
 * - Study Planning advice
 * - Test Day preparation
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  Calendar,
  Brain,
  Lightbulb,
  Trophy,
  Timer,
  FileText,
} from 'lucide-react';
import { useCourse } from '../../../providers/CourseProvider';
import { getResourceConfig } from './resourceConfig';

const StrategyPage: React.FC = () => {
  const { course, courseId } = useCourse();
  const resourceConfig = getResourceConfig(courseId);
  const strategy = resourceConfig.strategyContent;
  const examTips = resourceConfig.examTips;

  // If no strategy content, show placeholder
  if (!strategy) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Strategy content coming soon
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Exam strategy tips for {course.name} are being developed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        to="/resources"
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${course.color}20` }}
        >
          <Target className="w-7 h-7" style={{ color: course.color }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {course.name} Exam Strategy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Master the exam format, manage your time, and maximize your score.
        </p>
      </div>

      {/* Quick Tips (from examTips) */}
      {examTips && (
        <section className="mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-amber-600" />
              <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200">
                {examTips.title}
              </h2>
            </div>
            <ul className="space-y-2">
              {examTips.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Exam Structure */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Exam Structure
          </h2>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Section breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Section</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Duration</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Question Types</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Passing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {strategy.examStructure.sections.map((section, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 dark:text-white">{section.code}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{section.name}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{section.duration}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {section.questionTypes.map((qt, qIdx) => (
                          <span 
                            key={qIdx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                          >
                            {qt.type}: {qt.count} ({qt.weight})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{section.passingScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary stats */}
          <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700 border-t border-slate-200 dark:border-slate-700">
            <div className="p-4 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Time</div>
              <div className="font-semibold text-slate-900 dark:text-white mt-1">{strategy.examStructure.totalTime}</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Testing Window</div>
              <div className="font-semibold text-slate-900 dark:text-white mt-1">{strategy.examStructure.testingWindow}</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Retake Policy</div>
              <div className="font-semibold text-slate-900 dark:text-white mt-1">{strategy.examStructure.retakePolicy}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Management */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Timer className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {strategy.timeManagement.title}
          </h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {strategy.timeManagement.strategies.map((strat, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <h3 className="font-medium text-slate-900 dark:text-white">{strat.title}</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{strat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Question Strategies */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Question Type Strategies
          </h2>
        </div>
        
        <div className="space-y-4">
          {strategy.questionStrategies.map((qs, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                {qs.type}
              </h3>
              <ul className="space-y-2">
                {qs.tips.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Study Planning */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Study Planning
          </h2>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
              <div className="text-xs text-emerald-600 uppercase tracking-wide font-medium">Recommended Hours</div>
              <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mt-1">
                {strategy.studyPlanning.recommendedHours}
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
              <div className="text-xs text-emerald-600 uppercase tracking-wide font-medium">Weekly Schedule</div>
              <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mt-1">
                {strategy.studyPlanning.weeklySchedule}
              </div>
            </div>
          </div>
          <h4 className="font-medium text-slate-900 dark:text-white mb-2">Study Tips</h4>
          <ul className="space-y-2">
            {strategy.studyPlanning.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Test Day */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Test Day Preparation
          </h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Before */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Before the Exam
            </h3>
            <ul className="space-y-2">
              {strategy.testDay.before.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* During */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              During the Exam
            </h3>
            <ul className="space-y-2">
              {strategy.testDay.during.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Mindset */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" />
              Right Mindset
            </h3>
            <ul className="space-y-2">
              {strategy.testDay.mindset.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl">
        <Trophy className="w-12 h-12 text-primary-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Ready to Practice?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Apply these strategies with practice questions.
        </p>
        <Link
          to="/practice"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          Start Practice
          <Target className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default StrategyPage;
