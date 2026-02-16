/**
 * CMASection.tsx
 * 
 * CMA Part/Section page using unified SectionTemplate.
 * Displays blueprint areas for CMA Part 1 or Part 2.
 */

import { useMemo, useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CMA_COURSE, CMA_SECTION_CONFIG, CMASectionId } from '../../courses/cma';
import { getCMAProgress, CMAOverallProgress } from '../../services/cmaProgressService';
import { 
  SectionTemplate, 
  type BlueprintArea,
  type SectionStats,
} from './templates';

export default function CMASection() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [progress, setProgress] = useState<CMAOverallProgress | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load progress
  useEffect(() => {
    const loadProgress = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      try {
        const data = await getCMAProgress(user.uid);
        setProgress(data);
      } catch (error) {
        console.error('Error loading CMA progress:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, [user?.uid]);
  
  // Get configs
  const normalizedId = sectionId?.toUpperCase() as CMASectionId;
  const legacyConfig = CMA_SECTION_CONFIG[normalizedId];
  const courseSection = useMemo(() => 
    CMA_COURSE.sections.find(s => s.id === normalizedId),
    [normalizedId]
  );
  
  // Handle not found
  if (!legacyConfig && !loading) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Part Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The requested CMA part doesn't exist.
        </p>
        <button 
          onClick={() => navigate('/cma/dashboard')}
          className="btn-primary"
        >
          Back to CMA Dashboard
        </button>
      </div>
    );
  }
  
  // Transform blueprint areas from course config
  const blueprintAreas: BlueprintArea[] = useMemo(() => {
    if (!courseSection?.blueprintAreas) return [];
    
    return courseSection.blueprintAreas.map(area => {
      const areaProgress = progress?.sections[normalizedId]?.blueprintAreaProgress?.[area.id];
      return {
        id: area.id,
        name: area.name,
        weight: area.weight,
        topics: area.topics || [],
        progress: areaProgress?.progressPercent || 0,
        accuracy: Math.round(areaProgress?.accuracy || 0),
      };
    });
  }, [courseSection, progress, normalizedId]);
  
  // Calculate stats
  const sectionProgress = progress?.sections[normalizedId];
  const stats: SectionStats = useMemo(() => ({
    examLength: legacyConfig?.examLength || (courseSection?.timeAllowed ? Math.round(courseSection.timeAllowed / 60) : 4),
    questionCount: legacyConfig?.questionCount || courseSection?.questionCount,
    totalProgress: sectionProgress?.progressPercent || 0,
    avgAccuracy: Math.round(sectionProgress?.accuracy || 0),
  }), [courseSection, legacyConfig, sectionProgress]);
  
  // Handle area practice
  const handleAreaPractice = useCallback((areaId: string) => {
    navigate(`/practice?course=cma&section=${sectionId}&area=${areaId}`);
  }, [navigate, sectionId]);
  
  // CMA-specific study tip
  const studyTip = sectionId === 'CMA1' || normalizedId === 'CMA1'
    ? 'Part 1 emphasizes operational topics. Focus on budgeting, variance analysis, and internal controls - these are heavily tested and require practice with calculations.'
    : 'Part 2 emphasizes strategic topics. Master NPV/IRR calculations, CVP analysis, and ratio analysis. Ethics questions require understanding IMA standards deeply.';

  return (
    <SectionTemplate
      examCode="cma"
      examDisplayCode="CMA"
      sectionId={normalizedId}
      sectionName={legacyConfig?.name || courseSection?.name || 'Loading...'}
      shortName={legacyConfig?.shortName || courseSection?.shortName || ''}
      description={legacyConfig?.description || `Master the key concepts in ${legacyConfig?.shortName || 'this part'} for the CMA exam.`}
      color={legacyConfig?.color || '#10b981'}
      stats={stats}
      blueprintAreas={blueprintAreas}
      backPath="/cma"
      backLabel="Back to CMA Dashboard"
      onAreaPractice={handleAreaPractice}
      studyTip={studyTip}
      loading={loading}
    />
  );
}
