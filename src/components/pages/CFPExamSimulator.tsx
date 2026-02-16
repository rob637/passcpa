/**
 * CFP Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for CFP Board Certified Financial Planner exam.
 * This wrapper provides CFP-specific configuration with domain multi-select.
 */

import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { CFP_QUESTIONS_ALL } from '../../data/cfp/questions';

// ============================================
// Types
// ============================================

type CFPDomain = 'CFP-PCR' | 'CFP-GEN' | 'CFP-RISK' | 'CFP-INV' | 'CFP-TAX' | 'CFP-RET' | 'CFP-EST' | 'CFP-PSY';

// ============================================
// Configuration
// ============================================

const CFP_SECTIONS: Record<CFPDomain, { id: string; name: string; description: string }> = {
  'CFP-PCR': {
    id: 'CFP-PCR',
    name: 'Professional Conduct & Regulation',
    description: 'Ethics, fiduciary duty, and regulatory requirements (8%)',
  },
  'CFP-GEN': {
    id: 'CFP-GEN',
    name: 'General Principles',
    description: 'Financial planning process and communication (15%)',
  },
  'CFP-RISK': {
    id: 'CFP-RISK',
    name: 'Risk Management & Insurance',
    description: 'Insurance analysis and risk mitigation (11%)',
  },
  'CFP-INV': {
    id: 'CFP-INV',
    name: 'Investment Planning',
    description: 'Portfolio management and investment strategies (17%)',
  },
  'CFP-TAX': {
    id: 'CFP-TAX',
    name: 'Tax Planning',
    description: 'Tax planning strategies and compliance (14%)',
  },
  'CFP-RET': {
    id: 'CFP-RET',
    name: 'Retirement Planning',
    description: 'Retirement savings and income strategies (18%)',
  },
  'CFP-EST': {
    id: 'CFP-EST',
    name: 'Estate Planning',
    description: 'Estate planning concepts and strategies (10%)',
  },
  'CFP-PSY': {
    id: 'CFP-PSY',
    name: 'Psychology of Financial Planning',
    description: 'Behavioral finance and client counseling (7%)',
  },
};

const CFP_EXAM_MODES: ExamMode[] = [
  { 
    id: 'full', 
    name: 'Full Exam', 
    questionCount: 170, 
    timeMinutes: 300, 
    description: 'Complete 170-question exam simulation (5 hours)' 
  },
  { 
    id: 'half', 
    name: 'Half Exam', 
    questionCount: 85, 
    timeMinutes: 150, 
    description: '85-question practice exam (2.5 hours)' 
  },
  { 
    id: 'quarter', 
    name: 'Quick Practice', 
    questionCount: 40, 
    timeMinutes: 60, 
    description: '40-question mini exam (1 hour)' 
  },
  { 
    id: 'mini', 
    name: 'Mini Quiz', 
    questionCount: 20, 
    timeMinutes: 30, 
    description: '20-question rapid review (30 minutes)' 
  },
];

// ============================================
// Question Pool  
// ============================================

function getQuestionPool(domain: CFPDomain): ExamQuestion[] {
  // Filter questions by section
  const filtered = CFP_QUESTIONS_ALL.filter(q => {
    const section = q.section || '';
    return section.includes(domain) || section.includes(domain.replace('CFP-', ''));
  });
  
  return filtered.map((q, idx) => ({
    id: q.id || `cfp-q-${idx}`,
    question: q.question || '',
    options: q.options || [],
    correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
    explanation: q.explanation || '',
    section: domain,
  }));
}

// ============================================
// Exam Generator
// ============================================

function generateExam(
  _domain: CFPDomain,
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

const config: ExamSimulatorConfig<CFPDomain> = {
  courseId: 'cfp',
  courseName: 'CFP',
  courseDescription: 'Practice with realistic exam conditions for the CFP Board certification exam',
  backPath: '/cfp/dashboard',
  testingProvider: 'prometric',
  sections: CFP_SECTIONS,
  defaultSection: 'CFP-GEN',
  modes: CFP_EXAM_MODES,
  defaultModeIndex: 2, // Quick Practice
  getQuestionPool,
  generateExam,
  passingScore: 70,
  allowMultiSectionSelect: true,
};

export default function CFPExamSimulatorNew() {
  return <ExamSimulatorTemplate<CFPDomain> config={config} />;
}
