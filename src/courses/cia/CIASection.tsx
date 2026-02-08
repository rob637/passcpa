
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Play,
  CheckCircle2,
  LucideIcon,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  FileText
} from 'lucide-react';
import clsx from 'clsx';
import { CIA_SECTION_CONFIG, CIASectionId, CIA_COURSE } from './config';
import { useCIAProgress } from '../../hooks/useCIAProgress';
import { PageLoader } from '../../components/common/PageLoader';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

// Blueprint Area Card
interface BlueprintAreaCardProps {
  id: string;
  name: string;
  weight: string;
  topics: string[];
  progress: number;
  accuracy: number;
  onPractice: () => void;
}

const BlueprintAreaCard: React.FC<BlueprintAreaCardProps> = ({
  name,
  weight,
  topics,
  progress,
  accuracy,
  onPractice,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card noPadding className="overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                {name}
              </h3>
              {progress >= 100 && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 dark:text-slate-300">
              <span>Weight: {weight}</span>
              {accuracy > 0 && <span>{accuracy}% accuracy</span>}
            </div>
          </div>
          <ChevronRight
            className={clsx(
              'w-5 h-5 text-slate-400 transition-transform',
              isExpanded && 'rotate-90'
            )}
          />
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </button>

      {/* Expanded topics */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-700">
          <div className="pt-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Topics Covered
            </p>
            <ul className="space-y-1.5 mb-4">
              {topics.map((topic, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {topic}
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              fullWidth
              leftIcon={Play}
              onClick={(e) => {
                e.stopPropagation();
                onPractice();
              }}
            >
              Practice This Area
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default function CIASection() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { progress, loading } = useCIAProgress();

  // Validate sectionId
  const normalizedId = sectionId?.toUpperCase() as CIASectionId;
  const config = CIA_SECTION_CONFIG[normalizedId];
  const courseSection = CIA_COURSE.sections.find(s => s.id === normalizedId);

  // Icons map
  const IconMap: Record<string, LucideIcon> = {
    ShieldCheck,
    Briefcase,
    TrendingUp
  };
  const Icon = config ? (IconMap[config.icon] || FileText) : FileText;

  if (loading) return <PageLoader />;

  if (!config || !courseSection) {
    return <div className="p-8 text-center">Section not found</div>;
  }

  const sectionProgress = progress?.sections[normalizedId];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => navigate('/cia/dashboard')}
          className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-4 hover:underline"
        >
            &larr; Back to Dashboard
        </Button>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: config.color }}
            >
                <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{config.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {sectionProgress?.questionsAttempted || 0} / {config.questionsCount} Questions
                </span>
                <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {Math.round(sectionProgress?.accuracy || 0)}% Accuracy
                </span>
              </div>
            </div>
          </div>
          <Button 
            variant="primary"
            size="lg"
            leftIcon={Play}
            onClick={() => navigate('/cia/practice/quick')}
            className="shadow-lg shadow-primary-500/20"
          >
            Start Practice
          </Button>
        </div>
      </div>

      {/* Blueprints Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Syllabus & Blueprints</h2>
        <div className="grid gap-4">
            {courseSection.blueprintAreas.map((area) => {
                const areaProgress = sectionProgress?.blueprintAreaProgress?.[area.id] || { progressPercent: 0, accuracy: 0 };
                return (
                    <BlueprintAreaCard 
                        key={area.id}
                        id={area.id}
                        name={area.name}
                        weight={area.weight || 'N/A'}
                        topics={area.topics || []}
                        progress={areaProgress.progressPercent}
                        accuracy={Math.round(areaProgress.accuracy)}
                        onPractice={() => navigate(`/practice?mode=domain&domainId=${area.id}`)}
                    />
                );
            })}
        </div>
      </div>
    </div>
  );
}
