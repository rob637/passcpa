/**
 * Resources Hub Page
 * 
 * Tile-based navigation hub for all study resources.
 * Each exam course uses this template with course-specific data.
 * 
 * Resources include:
 * - Cheatsheets (markdown quick reference)
 * - Study Guides (comprehensive study plans)
 * - Formula Sheets (essential calculations)
 * - Mnemonics (memory aids)
 * - Quick References (tables, deadlines)
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  BookOpen,
  Target,
  GraduationCap,
  Clock,
  FileText,
  Compass,
} from 'lucide-react';
import { useCourse } from '../../../providers/CourseProvider';
import { getResourceConfig, ResourceCategory, ResourceType } from './resourceConfig';

/**
 * ResourceCategoryTile - Large clickable tile for each resource type
 */
interface ResourceCategoryTileProps {
  category: ResourceCategory;
  onClick: () => void;
}

const ResourceCategoryTile: React.FC<ResourceCategoryTileProps> = ({ category, onClick }) => {
  const Icon = category.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-2xl border-2 transition-all duration-200
        bg-white dark:bg-slate-800
        border-slate-200 dark:border-slate-700
        hover:border-${category.color} hover:shadow-lg
        hover:scale-[1.02]
        text-left group
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center
          bg-${category.colorLight} dark:bg-${category.colorDark}
        `}>
          <Icon className={`w-7 h-7 text-${category.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {category.title}
            </h3>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {category.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className={`px-2 py-0.5 rounded-full bg-${category.colorLight} dark:bg-${category.colorDark} text-${category.color}`}>
              {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

/**
 * ResourcesHub - Main component
 */
const ResourcesHub: React.FC = () => {
  const { course, courseId } = useCourse();
  const navigate = useNavigate();
  const resourceConfig = getResourceConfig(courseId);

  const handleCategoryClick = (type: ResourceType) => {
    navigate(`/resources/${type}`);
  };

  // Filter out empty categories
  const nonEmptyCategories = resourceConfig.categories.filter(c => c.items.length > 0);

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
          {course.shortName} Resources
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Study materials, quick references, and memory aids
        </p>
      </div>

      {/* Exam Overview Card (optional) */}
      {resourceConfig.examOverview && (
        <div className="card mb-8">
          <div className="card-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {resourceConfig.examOverview.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Exam overview and format
                </p>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              {resourceConfig.examOverview.description}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Format</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {resourceConfig.examOverview.format}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Duration</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {resourceConfig.examOverview.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <Target className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Sections</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {resourceConfig.examOverview.sections} sections
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Categories Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Study Materials
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {nonEmptyCategories.map((category) => (
            <ResourceCategoryTile
              key={category.type}
              category={category}
              onClick={() => handleCategoryClick(category.type)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-200 dark:border-primary-700">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Ready to Study?
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
      </div>
    </div>
  );
};

export default ResourcesHub;
