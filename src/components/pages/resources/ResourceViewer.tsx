/**
 * Resource Viewer
 * 
 * Renders individual resource content based on type:
 * - Cheatsheets: Markdown content
 * - Study Guides: Structured sections
 * - Formula Sheets: Tables of formulas
 * - Mnemonics: Flashcard-style cards
 * - Reference: Markdown content
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Info,
} from 'lucide-react';
import { useCourse } from '../../../providers/CourseProvider';
import { getResourceConfig, getResourceItem, ResourceType } from './resourceConfig';

// Resource Viewers
import { 
  StudyGuideViewer, 
  FormulaSheetViewer, 
  MnemonicViewer, 
  CheatsheetViewer,
  BlueprintViewer 
} from './viewers';

const ResourceViewer: React.FC = () => {
  const { type, itemId } = useParams<{ type: ResourceType; itemId: string }>();
  const { courseId } = useCourse();
  
  const resourceConfig = getResourceConfig(courseId);
  const item = itemId && type ? getResourceItem(courseId, type, itemId) : null;
  const category = resourceConfig.categories.find(c => c.type === type);

  if (!item || !category || !type) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">Resource not found</p>
        <Link to="/resources" className="text-primary-600 hover:underline mt-2 inline-block">
          ← Back to Resources
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  // Render content based on resource type
  const renderContent = () => {
    switch (type) {
      case 'cheatsheet':
        return <CheatsheetViewer courseId={courseId} item={item} />;
      case 'study-guide':
        return <StudyGuideViewer courseId={courseId} item={item} />;
      case 'formula-sheet':
        return <FormulaSheetViewer courseId={courseId} item={item} />;
      case 'mnemonic':
        return <MnemonicViewer courseId={courseId} item={item} />;
      case 'reference':
        return <CheatsheetViewer courseId={courseId} item={item} />;
      case 'blueprint':
        return <BlueprintViewer courseId={courseId} item={item} />;
      default:
        return (
          <div className="text-center py-8">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">Content viewer not available for this resource type</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link
        to={`/resources/${type}`}
        className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to {category.title}
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center
          bg-${category.colorLight} dark:bg-${category.colorDark}
        `}>
          <Icon className={`w-7 h-7 text-${category.color}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            {item.section && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {item.section}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {item.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {item.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResourceViewer;
