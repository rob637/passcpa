/**
 * EA Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for IRS Special Enrollment Examination.
 * This wrapper provides EA-specific configuration.
 */

import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { Question, EASection } from '../../types';
import { SEE1_ALL, SEE2_ALL, SEE3_ALL } from '../../data/ea/questions';

// ============================================
// Configuration
// ============================================

const EA_SECTIONS: Record<EASection, { id: string; name: string; description: string }> = {
  SEE1: {
    id: 'SEE1',
    name: 'Part 1: Individuals',
    description: 'Individual taxation including income, deductions, credits, and tax computation',
  },
  SEE2: {
    id: 'SEE2',
    name: 'Part 2: Businesses',
    description: 'Business entities, depreciation, employment taxes, partnerships, and corporations',
  },
  SEE3: {
    id: 'SEE3',
    name: 'Part 3: Representation',
    description: 'Practice before IRS, ethics, Circular 230, penalties, and collection procedures',
  },
};

const EA_EXAM_MODES: ExamMode[] = [
  { 
    id: 'full', 
    name: 'Full Exam', 
    questionCount: 100, 
    timeMinutes: 210, 
    description: 'Complete 100-question exam simulation (3.5 hours)' 
  },
  { 
    id: 'half', 
    name: 'Half Exam', 
    questionCount: 50, 
    timeMinutes: 105, 
    description: '50-question practice exam (1.75 hours)' 
  },
  { 
    id: 'quarter', 
    name: 'Quick Practice', 
    questionCount: 25, 
    timeMinutes: 52, 
    description: '25-question mini exam (52 minutes)' 
  },
  { 
    id: 'mini', 
    name: 'Mini Quiz', 
    questionCount: 10, 
    timeMinutes: 21, 
    description: '10-question rapid review (21 minutes)' 
  },
];

// ============================================
// Question Pool
// ============================================

function getQuestionPool(section: EASection): ExamQuestion[] {
  let questions: Question[];
  
  switch (section) {
    case 'SEE1':
      questions = SEE1_ALL;
      break;
    case 'SEE2':
      questions = SEE2_ALL;
      break;
    case 'SEE3':
      questions = SEE3_ALL;
      break;
    default:
      questions = [];
  }
  
  // Map to ExamQuestion format
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
  _section: EASection,
  mode: ExamMode,
  questionPool: ExamQuestion[]
): GeneratedExam {
  // Shuffle questions for randomness
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  
  // Select the required number of questions
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

const config: ExamSimulatorConfig<EASection> = {
  courseId: 'ea',
  courseName: 'EA',
  courseDescription: 'Practice with realistic exam conditions for the IRS Special Enrollment Examination',
  backPath: '/ea/dashboard',
  testingProvider: 'prometric',
  sections: EA_SECTIONS,
  defaultSection: 'SEE1',
  modes: EA_EXAM_MODES,
  defaultModeIndex: 1, // Half Exam
  getQuestionPool,
  generateExam,
  passingScore: 70,
};

export default function EAExamSimulatorNew() {
  return <ExamSimulatorTemplate<EASection> config={config} />;
}
