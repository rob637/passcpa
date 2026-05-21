/**
 * CMA Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for IMA Certified Management Accountant exam.
 * This wrapper provides CMA-specific configuration.
 */

import { useMemo } from 'react';
import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { useExamQuestionsBySection } from '../../hooks/useExamQuestionsBySection';
import { PageLoader } from '../common/PageLoader';

// ============================================
// Types
// ============================================

type CMASection = 'CMA1' | 'CMA2';

// ============================================
// Configuration
// ============================================

const CMA_SECTIONS: Record<CMASection, { id: string; name: string; description: string }> = {
  CMA1: {
    id: 'CMA1',
    name: 'Part 1: Financial Planning, Performance and Analytics',
    description: 'External financial reporting, planning, budgeting, forecasting, performance management, and cost management',
  },
  CMA2: {
    id: 'CMA2',
    name: 'Part 2: Strategic Financial Management',
    description: 'Financial statement analysis, corporate finance, decision analysis, risk management, investment decisions, and ethics',
  },
};

const CMA_EXAM_MODES: ExamMode[] = [
  { 
    id: 'full', 
    name: 'Full Exam', 
    questionCount: 100, 
    timeMinutes: 180, 
    description: 'Complete 100-question exam simulation (3 hours)' 
  },
  { 
    id: 'half', 
    name: 'Half Exam', 
    questionCount: 50, 
    timeMinutes: 90, 
    description: '50-question practice exam (1.5 hours)' 
  },
  { 
    id: 'quarter', 
    name: 'Quick Practice', 
    questionCount: 25, 
    timeMinutes: 45, 
    description: '25-question mini exam (45 minutes)' 
  },
  { 
    id: 'mini', 
    name: 'Mini Quiz', 
    questionCount: 10, 
    timeMinutes: 18, 
    description: '10-question rapid review (18 minutes)' 
  },
];

// ============================================
// Question Pool — built at runtime from useExamQuestionsBySection.
// Question banks are NOT statically imported (keeps ~5 MB out of JS bundle).
// ============================================

// ============================================
// Exam Generator
// ============================================

function generateExam(
  _section: CMASection,
  mode: ExamMode,
  questionPool: ExamQuestion[]
): GeneratedExam {
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(mode.questionCount, shuffled.length));
  
  return {
    questions: selected,
    timeRemaining: mode.timeMinutes * 60,
    answers: {},
    flagged: new Set(),
  };
}

// ============================================
// Component
// ============================================

import { useAuth } from '../../hooks/useAuth';

const baseConfig: Omit<ExamSimulatorConfig<CMASection>, 'defaultSection' | 'getQuestionPool'> = {
  courseId: 'cma',
  courseName: 'CMA',
  courseDescription: 'Practice with realistic exam conditions for the IMA Certified Management Accountant exam',
  backPath: '/cma/dashboard',
  testingProvider: 'prometric',
  sections: CMA_SECTIONS,
  modes: CMA_EXAM_MODES,
  defaultModeIndex: 1,
  generateExam,
  passingScore: 72, // CMA passing score is 360/500 = 72%
};

export default function CMAExamSimulatorNew() {
  const { userProfile } = useAuth();
  const { questionsBySection, loading } = useExamQuestionsBySection<CMASection>('cma');
  
  // Use user's selected section, default to CMA1 if not set or invalid
  const userSection = userProfile?.examSection;
  const isValidSection = userSection === 'CMA1' || userSection === 'CMA2';
  const defaultSection: CMASection = isValidSection ? userSection : 'CMA1';

  const getQuestionPool = useMemo(() => {
    return (section: CMASection): ExamQuestion[] =>
      (questionsBySection?.[section] ?? []);
  }, [questionsBySection]);

  const config: ExamSimulatorConfig<CMASection> = useMemo(() => ({
    ...baseConfig,
    defaultSection,
    getQuestionPool,
    // Always hide - user picks their part on dashboard, not in simulator (matches CPA behavior)
    hideSectionSelector: true,
  }), [defaultSection, getQuestionPool]);

  if (loading || !questionsBySection) return <PageLoader />;
  
  return <ExamSimulatorTemplate<CMASection> config={config} />;
}
