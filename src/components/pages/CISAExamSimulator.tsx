/**
 * CISA Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for ISACA Certified Information Systems Auditor exam.
 * This wrapper provides CISA-specific configuration with domain multi-select.
 */

import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { CISASectionId } from '../../courses/cisa';
import { CISA_QUESTIONS } from '../../data/cisa/questions';

// ============================================
// Configuration
// ============================================

const CISA_SECTIONS: Record<CISASectionId, { id: string; name: string; description: string }> = {
  CISA1: {
    id: 'CISA1',
    name: 'Domain 1: IS Audit Process',
    description: 'Planning, execution, and reporting of IS audits (18%)',
  },
  CISA2: {
    id: 'CISA2',
    name: 'Domain 2: Governance and Management of IT',
    description: 'IT governance, management, and organizational structure (18%)',
  },
  CISA3: {
    id: 'CISA3',
    name: 'Domain 3: Information Systems Acquisition, Development and Implementation',
    description: 'Systems development lifecycle and project management (12%)',
  },
  CISA4: {
    id: 'CISA4',
    name: 'Domain 4: IS Operations and Business Resilience',
    description: 'IT service management, operations, and continuity (26%)',
  },
  CISA5: {
    id: 'CISA5',
    name: 'Domain 5: Protection of Information Assets',
    description: 'Information security and access controls (26%)',
  },
};

const CISA_EXAM_MODES: ExamMode[] = [
  { 
    id: 'full', 
    name: 'Full Exam', 
    questionCount: 150, 
    timeMinutes: 240, 
    description: 'Complete 150-question exam simulation (4 hours)' 
  },
  { 
    id: 'half', 
    name: 'Half Exam', 
    questionCount: 75, 
    timeMinutes: 120, 
    description: '75-question practice exam (2 hours)' 
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
// Question Pool
// ============================================

function getQuestionPool(section: CISASectionId): ExamQuestion[] {
  const filtered = CISA_QUESTIONS.filter(q => q.section === section);
  
  return filtered.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    section: section,
  }));
}

// ============================================
// Exam Generator
// ============================================

function generateExam(
  _section: CISASectionId,
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

const config: ExamSimulatorConfig<CISASectionId> = {
  courseId: 'cisa',
  courseName: 'CISA',
  courseDescription: 'Practice with realistic exam conditions for the ISACA Certified Information Systems Auditor exam',
  backPath: '/cisa/dashboard',
  testingProvider: 'pearsonvue',
  sections: CISA_SECTIONS,
  defaultSection: 'CISA1',
  modes: CISA_EXAM_MODES,
  defaultModeIndex: 2, // Quick Practice
  getQuestionPool,
  generateExam,
  passingScore: 70,
  allowMultiSectionSelect: true,
};

export default function CISAExamSimulatorNew() {
  return <ExamSimulatorTemplate<CISASectionId> config={config} />;
}
