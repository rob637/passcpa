/**
 * Resource List Page
 * 
 * Lists all items within a resource category (e.g., all cheatsheets).
 * Click to drill into individual resource viewer.
 */

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCourse } from '../../../providers/CourseProvider';
import { getResourceConfig, ResourceType, ResourceItem } from './resourceConfig';

const ResourceList: React.FC = () => {
  const { type } = useParams<{ type: ResourceType }>();
  const { courseId } = useCourse();
  const navigate = useNavigate();
  
  const resourceConfig = getResourceConfig(courseId);
  const category = resourceConfig.categories.find(c => c.type === type);
  
  if (!category || !type) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">Resource type not found</p>
        <Link to="/resources" className="text-primary-600 hover:underline mt-2 inline-block">
          ← Back to Resources
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  const handleItemClick = (item: ResourceItem) => {
    navigate(`/resources/${type}/${item.id}`);
  };

  // Group items by section if they have sections
  const itemsBySection = category.items.reduce((acc, item) => {
    const section = item.section || 'General';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, ResourceItem[]>);

  const hasSections = Object.keys(itemsBySection).length > 1 || !itemsBySection['General'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/resources"
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Resources
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          bg-${category.colorLight} dark:bg-${category.colorDark}
        `}>
          <Icon className={`w-8 h-8 text-${category.color}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {category.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {category.description}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {category.items.length} {category.items.length === 1 ? 'resource' : 'resources'} available
          </p>
        </div>
      </div>

      {/* Resource Items */}
      {hasSections ? (
        // Grouped by section
        <div className="space-y-8">
          {Object.entries(itemsBySection).map(([section, items]) => (
            <div key={section}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                {section}
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat list
        <div className="space-y-3">
          {category.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
