/**
 * CIA Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for IIA Certified Internal Auditor exam.
 * This wrapper provides CIA-specific configuration.
 */

import { useMemo } from 'react';
import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { CIASectionId } from '../../courses/cia/config';
import { useExamQuestionsBySection } from '../../hooks/useExamQuestionsBySection';
import { PageLoader } from '../common/PageLoader';

// ============================================
// Configuration
// ============================================

const CIA_SECTIONS: Record<CIASectionId, { id: string; name: string; description: string }> = {
  CIA1: {
    id: 'CIA1',
    name: 'Part 1: Essentials of Internal Auditing',
    description: 'Foundations, independence, proficiency, QAIP, governance, risk, and control',
  },
  CIA2: {
    id: 'CIA2',
    name: 'Part 2: Practice of Internal Auditing',
    description: 'Managing IA activity, planning, performing, and communicating results',
  },
  CIA3: {
    id: 'CIA3',
    name: 'Part 3: Business Knowledge for Internal Auditing',
    description: 'Business acumen, information security, IT, and financial management',
  },
};

// CIA Part 1 has 125 questions, Parts 2 & 3 have 100 questions
function getExamModes(section: CIASectionId): ExamMode[] {
  const isPartOne = section === 'CIA1';
  const fullCount = isPartOne ? 125 : 100;
  const fullTime = isPartOne ? 150 : 120;
  
  return [
    { 
      id: 'full', 
      name: 'Full Exam', 
      questionCount: fullCount, 
      timeMinutes: fullTime, 
      description: `Complete ${fullCount}-question exam simulation` 
    },
    { 
      id: 'half', 
      name: 'Half Exam', 
      questionCount: Math.round(fullCount / 2), 
      timeMinutes: Math.round(fullTime / 2), 
      description: `${Math.round(fullCount / 2)}-question practice exam` 
    },
    { 
      id: 'quarter', 
      name: 'Quick Practice', 
      questionCount: 25, 
      timeMinutes: 30, 
      description: '25-question mini exam (30 minutes)' 
    },
    { 
      id: 'mini', 
      name: 'Mini Quiz', 
      questionCount: 10, 
      timeMinutes: 15, 
      description: '10-question rapid review (15 minutes)' 
    },
  ];
}

// Default modes for CIA1
const CIA_EXAM_MODES = getExamModes('CIA1');

// ============================================
// Question Pool
// Built at runtime from questions fetched via useExamQuestionsBySection.
// Question banks are NOT statically imported (would bundle ~10 MB per course).
// ============================================

// ============================================
// Exam Generator
// ============================================

function generateExam(
  _section: CIASectionId,
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

const baseConfig: Omit<ExamSimulatorConfig<CIASectionId>, 'defaultSection' | 'getQuestionPool'> = {
  courseId: 'cia',
  courseName: 'CIA',
  courseDescription: 'Practice with realistic exam conditions for the IIA Certified Internal Auditor exam',
  backPath: '/cia/dashboard',
  testingProvider: 'pearsonvue',
  sections: CIA_SECTIONS,
  modes: CIA_EXAM_MODES,
  defaultModeIndex: 2, // Quick Practice
  getModes: getExamModes, // Dynamic modes per part (Part 1: 125Q, Parts 2&3: 100Q)
  generateExam,
  passingScore: 60, // CIA uses scaled scoring, ~60% raw approximation
};

export default function CIAExamSimulatorNew() {
  const { userProfile } = useAuth();
  const { questionsBySection, loading } = useExamQuestionsBySection<CIASectionId>('cia');
  
  // Use user's selected section, default to CIA1 if not set or invalid
  const userSection = userProfile?.examSection;
  const isValidSection = userSection === 'CIA1' || userSection === 'CIA2' || userSection === 'CIA3';
  const defaultSection: CIASectionId = isValidSection ? userSection : 'CIA1';

  const getQuestionPool = useMemo(() => {
    return (section: CIASectionId): ExamQuestion[] =>
      (questionsBySection?.[section] ?? []);
  }, [questionsBySection]);

  const config: ExamSimulatorConfig<CIASectionId> = useMemo(() => ({
    ...baseConfig,
    defaultSection,
    getQuestionPool,
    // Always hide - user picks their part on dashboard, not in simulator (matches CPA behavior)
    hideSectionSelector: true,
  }), [defaultSection, getQuestionPool]);

  if (loading || !questionsBySection) return <PageLoader />;
  
  return <ExamSimulatorTemplate<CIASectionId> config={config} />;
}
