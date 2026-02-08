/**
 * Templates index
 * 
 * Unified templates for consistent UX across all exam types.
 */

export { DashboardTemplate } from './DashboardTemplate';
export type { 
  DashboardTemplateProps, 
  DashboardStats, 
  ExamSection, 
  QuickAction as DashboardQuickAction,
} from './DashboardTemplate';

export { SectionTemplate, getDefaultQuickActions } from './SectionTemplate';
export type { 
  SectionTemplateProps, 
  BlueprintArea, 
  SectionStats, 
  QuickAction as SectionQuickAction,
} from './SectionTemplate';

export { 
  DASHBOARD_CONFIG, 
  getDashboardConfig, 
  getSectionPath, 
  getDashboardPath,
} from './DashboardData';
export type { DashboardConfig } from './DashboardData';
