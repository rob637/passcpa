/**
 * CFPDashboard.tsx
 * 
 * CFP (Certified Financial Planner) Dashboard using unified template.
 * Displays progress across 8 principal knowledge domains.
 */

import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCFPProgress } from '../../hooks/useCFPProgress';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { CFP_SECTIONS } from './config';
import { 
  DashboardTemplate, 
  getDashboardConfig,
  type ExamSection,
  type DashboardStats,
} from '../../components/pages/templates';

export default function CFPDashboard() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { progress, loading } = useCFPProgress();
  const { daysToExam } = useStudyPlan('cfp');
  
  // Get config for CFP
  const config = getDashboardConfig('cfp');
  
  // Get user's first name for greeting
  const userName = userProfile?.displayName?.split(' ')[0] || 'there';
  
  // Transform progress data into template format
  const stats: DashboardStats = useMemo(() => ({
    overallReadiness: progress?.readinessScore || 0,
    questionsAnswered: progress?.totalQuestionsAttempted || 0,
    studyStreak: progress?.streakDays || 0,
    accuracy: Math.round(progress?.overallAccuracy || 0),
    daysToExam,
  }), [progress, daysToExam]);
  
  // Transform sections into template format
  const sections: ExamSection[] = useMemo(() => 
    CFP_SECTIONS.map((section) => {
      const sectionProgress = progress?.sectionProgress?.[section.id];
      return {
        id: section.id,
        name: section.name,
        shortName: section.shortName,
        color: section.id.includes('ETHICS') ? '#f59e0b' :
               section.id.includes('TAX') ? '#ef4444' :
               section.id.includes('INV') ? '#3b82f6' :
               '#22c55e', // green default
        progress: sectionProgress?.score || 0,
        questionsAttempted: sectionProgress?.answeredCount || 0,
        accuracy: sectionProgress?.answeredCount 
          ? Math.round((sectionProgress.correctCount / sectionProgress.answeredCount) * 100) 
          : 0,
        weight: section.weight,
      };
    }),
    [progress]
  );
  
  // Handle section click
  const handleSectionClick = useCallback((sectionId: string) => {
    navigate(`/cfp/domain/${sectionId}`);
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
