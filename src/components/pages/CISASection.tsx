/**
 * CISASection.tsx
 * 
 * CISA Domain/Section page using unified SectionTemplate.
 * Displays blueprint areas with expandable topics for each CISA domain.
 */

import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCISAProgress } from '../../hooks/useCISAProgress';
import { CISA_COURSE, CISA_SECTION_CONFIG, CISASectionId } from '../../courses/cisa';
import { 
  SectionTemplate, 
  type BlueprintArea,
  type SectionStats,
} from './templates';

export default function CISASection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progress, loading } = useCISAProgress();
  
  const sectionId = id as CISASectionId;
  const legacyConfig = CISA_SECTION_CONFIG[sectionId];
  const courseSection = useMemo(() => 
    CISA_COURSE.sections.find(s => s.id === sectionId),
    [sectionId]
  );
  
  // Handle not found
  if (!legacyConfig && !loading) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Domain Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The requested CISA domain doesn't exist.
        </p>
        <button 
          onClick={() => navigate('/cisa/dashboard')}
          className="btn-primary"
        >
          Back to CISA Dashboard
        </button>
      </div>
    );
  }
  
  // Transform blueprint areas from course config
  const blueprintAreas: BlueprintArea[] = useMemo(() => {
    if (!courseSection?.blueprintAreas) {
      // Fallback to legacy topics if blueprintAreas not defined
      if (legacyConfig?.topics) {
        return [{
          id: `${sectionId}-topics`,
          name: 'Key Topics',
          weight: legacyConfig.weight + '%',
          topics: legacyConfig.topics,
          progress: 0,
          accuracy: 0,
        }];
      }
      return [];
    }
    
    return courseSection.blueprintAreas.map(area => ({
      id: area.id,
      name: area.name,
      weight: area.weight,
      topics: area.topics || [],
      progress: 0, // TODO: Get from progress service per area
      accuracy: 0,
    }));
  }, [courseSection, legacyConfig, sectionId]);
  
  // Calculate stats
  const domainProgress = progress?.domainProgress?.[sectionId] || 0;
  const domainAccuracy = progress?.domainAccuracy?.[sectionId] || 0;
  const stats: SectionStats = useMemo(() => ({
    examLength: courseSection?.timeAllowed ? Math.round(courseSection.timeAllowed / 60) : undefined,
    questionCount: legacyConfig?.questionCount || courseSection?.questionCount,
    totalProgress: domainProgress,
    avgAccuracy: Math.round(domainAccuracy),
  }), [courseSection, legacyConfig, domainProgress, domainAccuracy]);
  
  // Determine color
  const sectionColor = useMemo(() => {
    // Parse color from legacy config (e.g., 'bg-indigo-500' -> '#6366f1')
    const colorMap: Record<string, string> = {
      'bg-indigo-500': '#6366f1',
      'bg-blue-500': '#3b82f6',
      'bg-cyan-500': '#06b6d4',
      'bg-teal-500': '#14b8a6',
      'bg-emerald-500': '#10b981',
    };
    return colorMap[legacyConfig?.color || ''] || '#6366f1';
  }, [legacyConfig]);
  
  // Handle area practice
  const handleAreaPractice = useCallback((areaId: string) => {
    navigate(`/practice?course=cisa&section=${sectionId}&area=${areaId}`);
  }, [navigate, sectionId]);

  return (
    <SectionTemplate
      examCode="cisa"
      examDisplayCode="CISA"
      sectionId={sectionId}
      sectionName={legacyConfig?.title || courseSection?.name || 'Loading...'}
      shortName={legacyConfig?.shortTitle || courseSection?.shortName || ''}
      description={legacyConfig?.description || `Master the key concepts in ${legacyConfig?.shortTitle || 'this domain'} for the CISA exam.`}
      color={sectionColor}
      stats={stats}
      blueprintAreas={blueprintAreas}
      backPath="/cisa/dashboard"
      backLabel="Back to CISA Dashboard"
      onAreaPractice={handleAreaPractice}
      studyTip={`ISACA emphasizes practical application. Focus on understanding how ${legacyConfig?.shortTitle || 'this domain'} concepts apply in real-world audit scenarios.`}
      loading={loading}
    />
  );
}
