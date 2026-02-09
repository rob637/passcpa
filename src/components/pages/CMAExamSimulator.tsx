/**
 * CMA Exam Simulator
 * 
 * Uses ExamSimulatorTemplate for IMA Certified Management Accountant exam.
 * This wrapper provides CMA-specific configuration.
 */

import React from 'react';
import { 
  ExamSimulatorTemplate, 
  ExamSimulatorConfig,
  ExamMode,
  ExamQuestion,
  GeneratedExam,
} from './templates/ExamSimulatorTemplate';
import { Question } from '../../types';
import { CMA_PART1_QUESTIONS, CMA_PART2_QUESTIONS } from '../../data/cma/questions';

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
// Question Pool
// ============================================

function getQuestionPool(section: CMASection): ExamQuestion[] {
  let questions: Question[];
  
  switch (section) {
    case 'CMA1':
      questions = CMA_PART1_QUESTIONS as Question[];
      break;
    case 'CMA2':
      questions = CMA_PART2_QUESTIONS as Question[];
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
  section: CMASection,
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

const config: ExamSimulatorConfig<CMASection> = {
  courseId: 'cma',
  courseName: 'CMA',
  courseDescription: 'Practice with realistic exam conditions for the IMA Certified Management Accountant exam',
  backPath: '/cma/dashboard',
  sections: CMA_SECTIONS,
  defaultSection: 'CMA1',
  modes: CMA_EXAM_MODES,
  defaultModeIndex: 1,
  getQuestionPool,
  generateExam,
  passingScore: 72, // CMA passing score is 360/500 = 72%
};

export default function CMAExamSimulatorNew() {
  return <ExamSimulatorTemplate<CMASection> config={config} />;
}
