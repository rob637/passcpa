/**
 * DashboardData.ts
 * 
 * Static configuration data for dashboard templates across all exam types.
 * Similar to ExamLandingData.ts but for authenticated dashboard experience.
 */

import {
  BookOpen,
  Zap,
  Award,
  Layers,
} from 'lucide-react';
import type { CourseId } from '../../../types/course';
import type { DashboardQuickAction } from './index';

// ============================================================================
// Types
// ============================================================================

export interface DashboardConfig {
  examCode: string;           // 'CPA', 'EA', etc.
  examName: string;           // 'CPA Exam'
  examSubtitle: string;       // 'Certified Public Accountant'
  studyPlanPath: string;
  quickPracticePath: string;
  quickActions: DashboardQuickAction[];
  defaultStudyTip: string;
}

// ============================================================================
// Quick Action Generators
// ============================================================================

const createQuickActions = (courseId: CourseId): DashboardQuickAction[] => {
  const basePath = courseId === 'cpa' ? '' : `/${courseId}`;
  
  return [
    {
      id: 'practice',
      icon: BookOpen,
      label: 'Practice Questions',
      description: 'Targeted practice',
      path: `${basePath}/practice`,
      color: '#6366f1', // indigo
    },
    {
      id: 'cram',
      icon: Zap,
      label: 'Cram Mode',
      description: 'High-yield review',
      path: `${basePath}/cram`,
      color: '#f59e0b', // amber
    },
    {
      id: 'mock-exam',
      icon: Award,
      label: 'Mock Exam',
      description: 'Full simulation',
      path: `/${courseId}-exam`,
      color: '#22c55e', // green
    },
    {
      id: 'flashcards',
      icon: Layers,
      label: 'Flashcards',
      description: 'Key terms',
      path: `${basePath}/flashcards`,
      color: '#8b5cf6', // purple
      isFree: true, // Flashcards are free during trial
    },
  ];
};

// ============================================================================
// Dashboard Configurations
// ============================================================================

export const DASHBOARD_CONFIG: Record<CourseId, DashboardConfig> = {
  cpa: {
    examCode: 'CPA',
    examName: 'CPA Exam',
    examSubtitle: 'Certified Public Accountant',
    studyPlanPath: '/study-plan',
    quickPracticePath: '/practice/quick',
    quickActions: createQuickActions('cpa'),
    defaultStudyTip: 'Focus on your weakest blueprint areas first. The CPA exam heavily tests application, not just memorization.',
  },
  
  ea: {
    examCode: 'EA',
    examName: 'EA Exam',
    examSubtitle: 'Enrolled Agent',
    studyPlanPath: '/ea/study-plan',
    quickPracticePath: '/ea/practice/quick',
    quickActions: createQuickActions('ea'),
    defaultStudyTip: 'The SEE exams test practical tax knowledge. Focus on current year tax law and IRS procedures.',
  },
  
  cma: {
    examCode: 'CMA',
    examName: 'CMA Exam',
    examSubtitle: 'Certified Management Accountant',
    studyPlanPath: '/cma/study-plan',
    quickPracticePath: '/cma/practice/quick',
    quickActions: createQuickActions('cma'),
    defaultStudyTip: 'CMA Part 1 focuses on financial planning; Part 2 on strategic management. Master the calculations.',
  },
  
  cia: {
    examCode: 'CIA',
    examName: 'CIA Exam',
    examSubtitle: 'Certified Internal Auditor',
    studyPlanPath: '/cia/study-plan',
    quickPracticePath: '/cia/practice/quick',
    quickActions: createQuickActions('cia'),
    defaultStudyTip: 'The IIA Standards and Code of Ethics are heavily tested. Know them inside and out.',
  },
  
  cfp: {
    examCode: 'CFP',
    examName: 'CFP Exam',
    examSubtitle: 'Certified Financial Planner',
    studyPlanPath: '/cfp/study-plan',
    quickPracticePath: '/cfp/practice/quick',
    quickActions: createQuickActions('cfp'),
    defaultStudyTip: 'The CFP exam is case-study heavy. Practice integrating knowledge across all 8 domains.',
  },
  
  cisa: {
    examCode: 'CISA',
    examName: 'CISA Exam',
    examSubtitle: 'Certified Information Systems Auditor',
    studyPlanPath: '/cisa/study-plan',
    quickPracticePath: '/cisa/practice/quick',
    quickActions: createQuickActions('cisa'),
    defaultStudyTip: 'Focus on IS audit processes and IT governance. ISACA loves testing risk assessment methodologies.',
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get dashboard configuration for a specific course
 */
export const getDashboardConfig = (courseId: CourseId): DashboardConfig => {
  return DASHBOARD_CONFIG[courseId];
};

/**
 * Get section path for a specific course
 */
export const getSectionPath = (courseId: CourseId, sectionId: string): string => {
  if (courseId === 'cpa') {
    return `/learn/${sectionId}`;
  }
  return `/${courseId}/section/${sectionId}`;
};

/**
 * Get back path from section to dashboard
 */
export const getDashboardPath = (courseId: CourseId): string => {
  if (courseId === 'cpa') {
    return '/dashboard';
  }
  return `/${courseId}`;
};
