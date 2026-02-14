/**
 * CIA Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for IIA Certified Internal Auditor exam.
 * This wrapper provides CIA-specific configuration.
 */

import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { Question } from '../../types';
import { CIASectionId } from '../../courses/cia/config';
import { 
  ALL_CIA1_QUESTIONS as CIA1_QUESTIONS, 
  ALL_CIA2_QUESTIONS as CIA2_QUESTIONS, 
  ALL_CIA3_QUESTIONS as CIA3_QUESTIONS 
} from '../../data/cia/questions';

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
// ============================================

function getQuestionPool(section: CIASectionId): ExamQuestion[] {
  let questions: Question[];
  
  switch (section) {
    case 'CIA1':
      questions = CIA1_QUESTIONS as Question[];
      break;
    case 'CIA2':
      questions = CIA2_QUESTIONS as Question[];
      break;
    case 'CIA3':
      questions = CIA3_QUESTIONS as Question[];
      break;
    default:
      questions = [];
  }
  
  return questions.map(q => ({
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

const config: ExamSimulatorConfig<CIASectionId> = {
  courseId: 'cia',
  courseName: 'CIA',
  courseDescription: 'Practice with realistic exam conditions for the IIA Certified Internal Auditor exam',
  backPath: '/cia/dashboard',
  sections: CIA_SECTIONS,
  defaultSection: 'CIA1',
  modes: CIA_EXAM_MODES,
  defaultModeIndex: 2, // Quick Practice
  getQuestionPool,
  generateExam,
  passingScore: 60, // CIA uses scaled scoring, ~60% raw approximation
};

export default function CIAExamSimulatorNew() {
  return <ExamSimulatorTemplate<CIASectionId> config={config} />;
}
