/**
 * CFPSection.tsx
 * 
 * CFP Domain/Section page using unified SectionTemplate.
 * Displays blueprint areas with expandable topics for each CFP domain.
 */

import { useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCFPProgress } from '../../hooks/useCFPProgress';
import { CFP_SECTIONS } from './config';
import { 
  SectionTemplate, 
  type BlueprintArea,
  type SectionStats,
} from '../../components/pages/templates';

export default function CFPSection() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { progress, loading } = useCFPProgress();
  
  // Find the section config
  const section = useMemo(() => {
    return CFP_SECTIONS.find(s => s.id === sectionId);
  }, [sectionId]);
  
  // Transform blueprint areas
  const blueprintAreas: BlueprintArea[] = useMemo(() => {
    if (!section?.blueprintAreas) return [];
    
    return section.blueprintAreas.map(area => ({
      id: area.id,
      name: area.name,
      weight: area.weight,
      topics: area.topics || [],
      progress: 0, // TODO: Get from progress service
      accuracy: 0,
    }));
  }, [section]);
  
  // Calculate stats
  const stats: SectionStats = useMemo(() => {
    const sectionProgress = progress?.sectionProgress?.[sectionId || ''];
    return {
      examLength: undefined, // CFP is single exam, not per-domain
      questionCount: section?.questionCount,
      totalProgress: sectionProgress?.score || 0,
      avgAccuracy: sectionProgress?.answeredCount 
        ? Math.round((sectionProgress.correctCount / sectionProgress.answeredCount) * 100) 
        : 0,
    };
  }, [progress, section, sectionId]);
  
  // Determine color based on domain type
  const sectionColor = useMemo(() => {
    if (!sectionId) return '#22c55e';
    if (sectionId.includes('ETHICS') || sectionId.includes('PCR')) return '#f59e0b';
    if (sectionId.includes('TAX')) return '#ef4444';
    if (sectionId.includes('INV')) return '#3b82f6';
    if (sectionId.includes('RET')) return '#8b5cf6';
    if (sectionId.includes('EST')) return '#ec4899';
    if (sectionId.includes('RISK')) return '#06b6d4';
    return '#22c55e';
  }, [sectionId]);
  
  // Handle area practice
  const handleAreaPractice = useCallback((areaId: string) => {
    navigate(`/practice?course=cfp&section=${sectionId}&area=${areaId}`);
  }, [navigate, sectionId]);

  // Handle not found — AFTER all hooks to satisfy Rules of Hooks
  if (!section && !loading) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Domain Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The requested CFP domain doesn't exist.
        </p>
        <button 
          onClick={() => navigate('/cfp')}
          className="btn-primary"
        >
          Back to CFP Dashboard
        </button>
      </div>
    );
  }

  return (
    <SectionTemplate
      examCode="cfp"
      examDisplayCode="CFP"
      sectionId={sectionId || ''}
      sectionName={section?.name || 'Loading...'}
      shortName={section?.shortName || ''}
      description={`Master the key concepts in ${section?.name || 'this domain'} for the CFP exam.`}
      color={sectionColor}
      stats={stats}
      blueprintAreas={blueprintAreas}
      backPath="/cfp"
      backLabel="Back to CFP Dashboard"
      onAreaPractice={handleAreaPractice}
      studyTip={`Focus on integrating ${section?.shortName || 'this domain'} concepts with other domains. The CFP exam tests your ability to apply knowledge across all areas.`}
      loading={loading}
    />
  );
}
