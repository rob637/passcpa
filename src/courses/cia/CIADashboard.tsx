/**
 * CIADashboard.tsx
 * 
 * CIA (Certified Internal Auditor) Dashboard using unified template.
 * Displays progress across CIA1, CIA2, and CIA3 exam parts.
 */

import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCIAProgress } from '../../hooks/useCIAProgress';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { CIA_SECTION_CONFIG, CIASectionId, CIA_SECTIONS } from './config';
import { 
  DashboardTemplate, 
  getDashboardConfig,
  type ExamSection,
  type DashboardStats,
} from '../../components/pages/templates';

export default function CIADashboard() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { progress, loading } = useCIAProgress();
  const { daysToExam } = useStudyPlan('cia');
  
  // Get config for CIA
  const config = getDashboardConfig('cia');
  
  // Get user's first name for greeting
  const userName = userProfile?.displayName?.split(' ')[0] || 'there';
  
  // Transform progress data into template format
  const stats: DashboardStats = useMemo(() => ({
    overallReadiness: progress?.overall.readinessScore || 0,
    questionsAnswered: progress?.overall.totalQuestionsAttempted || 0,
    studyStreak: progress?.overall.streakDays || 0,
    accuracy: Math.round(progress?.overall.overallAccuracy || 0),
    daysToExam,
  }), [progress, daysToExam]);
  
  // Transform sections into template format
  const sections: ExamSection[] = useMemo(() => 
    CIA_SECTIONS.map((sectionId: CIASectionId) => ({
      id: sectionId,
      name: CIA_SECTION_CONFIG[sectionId].name,
      shortName: CIA_SECTION_CONFIG[sectionId].shortName,
      color: CIA_SECTION_CONFIG[sectionId].color,
      progress: progress?.sections[sectionId]?.progressPercent || 0,
      questionsAttempted: progress?.sections[sectionId]?.questionsAttempted || 0,
      accuracy: Math.round(progress?.sections[sectionId]?.accuracy || 0),
    })),
    [progress]
  );
  
  // Handle section click
  const handleSectionClick = useCallback((sectionId: string) => {
    navigate(`/cia/section/${sectionId}`);
  }, [navigate]);

  return (
    <DashboardTemplate
      examCode={config.examCode}
      examName={config.examName}
      examSubtitle={config.examSubtitle}
      userName={userName}
      stats={stats}
      loading={loading}
      sections={sections}
      onSectionClick={handleSectionClick}
      quickActions={config.quickActions}
      showDailyPlan={true}
      studyPlanPath={config.studyPlanPath}
      quickPracticePath={config.quickPracticePath}
    />
  );
}
