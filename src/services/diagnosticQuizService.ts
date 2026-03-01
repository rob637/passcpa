/**
 * Dynamic Diagnostic Quiz Generator
 * 
 * Generates diagnostic quizzes by sampling from the main question bank.
 * Benefits: Single source of truth, balanced answers, enhanced explanations.
 */

import type { DiagnosticQuiz, DiagnosticQuestion } from '../../types/diagnostic';
import type { CourseId } from '../../types/course';
import type { Question } from '../../types';
import { fetchQuestions } from '../../services/questionService';
import { COURSES } from '../../courses';

// Blueprint area names for display (kept from original files)
export const AREA_NAMES: Record<CourseId, Record<string, string>> = {
  cpa: {
    'FAR-I': 'Conceptual Framework & Financial Reporting',
    'FAR-II': 'Select Financial Statement Accounts',
    'FAR-III': 'Select Transactions',
    'FAR-IV': 'State and Local Governments',
    'FAR-V': 'Not-for-Profit Entities',
    'AUD-I': 'Ethics & Professional Responsibilities',
    'AUD-II': 'Assessing Risk & Planned Response',
    'AUD-III': 'Performing Procedures & Obtaining Evidence',
    'AUD-IV': 'Forming Conclusions & Reporting',
    'REG-I': 'Ethics, Responsibilities & Federal Tax Procedures',
    'REG-II': 'Business Law',
    'REG-III': 'Federal Taxation of Individuals',
    'REG-IV': 'Federal Taxation of Entities',
    'REG-V': 'Federal Taxation of Property Transactions',
    'BAR-I': 'Business Analysis',
    'BAR-II': 'Technical Accounting & Reporting',
    'BAR-III': 'State and Local Governments',
    'ISC-I': 'Information Systems',
    'ISC-II': 'Security, Confidentiality & Privacy',
    'ISC-III': 'System and Organization Controls',
    'TCP-I': 'Tax Compliance for Individuals & PFP',
    'TCP-II': 'Entity Tax Compliance',
    'TCP-III': 'Entity Tax Planning',
    'TCP-IV': 'Property Transactions',
  },
  ea: {
    'SEE1-A': 'Preliminary Work & Taxpayer Data',
    'SEE1-B': 'Income & Assets',
    'SEE1-C': 'Deductions & Credits',
    'SEE1-D': 'Other Topics',
    'SEE2-A': 'Business Entities',
    'SEE2-B': 'Business Financial Information',
    'SEE2-C': 'Specialized Returns',
    'SEE3-A': 'Representation',
    'SEE3-B': 'Practice Requirements',
    'SEE3-C': 'Procedures & Penalties',
  },
  cma: {
    'CMA1-A': 'External Financial Reporting Decisions',
    'CMA1-B': 'Planning, Budgeting, and Forecasting',
    'CMA1-C': 'Performance Management',
    'CMA1-D': 'Cost Management',
    'CMA1-E': 'Internal Controls',
    'CMA1-F': 'Technology and Analytics',
    'CMA2-A': 'Financial Statement Analysis',
    'CMA2-B': 'Corporate Finance',
    'CMA2-C': 'Decision Analysis',
    'CMA2-D': 'Risk Management',
    'CMA2-E': 'Investment Decisions',
    'CMA2-F': 'Professional Ethics',
  },
  cia: {
    'CIA1': 'Essentials of Internal Auditing',
    'CIA2': 'Practice of Internal Auditing',
    'CIA3': 'Business Knowledge for Internal Auditing',
  },
  cisa: {
    'CISA1': 'Information Systems Auditing Process',
    'CISA2': 'Governance and Management of IT',
    'CISA3': 'Information Systems Acquisition, Development and Implementation',
    'CISA4': 'Information Systems Operations and Business Resilience',
    'CISA5': 'Protection of Information Assets',
  },
  cfp: {
    'CFP-GEN': 'General Principles',
    'CFP-RISK': 'Risk Management',
    'CFP-INV': 'Investment Planning',
    'CFP-TAX': 'Tax Planning',
    'CFP-RET': 'Retirement Savings',
    'CFP-EST': 'Estate Planning',
    'CFP-PCR': 'Psychology of Financial Planning',
    'CFP-PSY': 'Professional Conduct & Regulation',
  },
};

// Quiz configuration per section
const QUIZ_CONFIG = {
  questionsPerQuiz: 25,
  timeLimit: 35, // minutes
  passingScore: 65, // percentage
  difficultyMix: { easy: 0.3, medium: 0.5, hard: 0.2 },
};

/**
 * Convert a Question from the main bank to DiagnosticQuestion format
 */
function toDiagnosticQuestion(q: Question): DiagnosticQuestion {
  return {
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    blueprintArea: q.blueprintArea || q.section,
    topic: q.topic,
    difficulty: q.difficulty,
    explanation: q.explanation,
  };
}

/**
 * Select questions with balanced blueprint area coverage
 */
function selectBalancedQuestions(
  questions: Question[],
  targetCount: number
): Question[] {
  // Group by blueprint area
  const byArea: Record<string, Question[]> = {};
  for (const q of questions) {
    const area = q.blueprintArea || 'Other';
    if (!byArea[area]) byArea[area] = [];
    byArea[area].push(q);
  }

  const areas = Object.keys(byArea);
  if (areas.length === 0) return [];

  // Calculate how many questions per area
  const perArea = Math.ceil(targetCount / areas.length);
  const selected: Question[] = [];

  // First pass: take up to perArea from each area
  for (const area of areas) {
    const pool = byArea[area];
    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, perArea));
  }

  // If we have more than needed, trim randomly
  if (selected.length > targetCount) {
    const shuffled = [...selected].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, targetCount);
  }

  // If we need more, add from remaining pool
  if (selected.length < targetCount) {
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = questions.filter(q => !selectedIds.has(q.id));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, targetCount - selected.length));
  }

  // Final shuffle to mix up the order
  return selected.sort(() => Math.random() - 0.5);
}

/**
 * Generate a diagnostic quiz for a given course section
 */
export async function generateDiagnosticQuiz(
  courseId: CourseId,
  section: string
): Promise<DiagnosticQuiz> {
  // Fetch questions for this section
  const questions = await fetchQuestions({
    courseId,
    section,
    count: 200, // Get a good pool to select from
  });

  // Select balanced questions
  const selectedQuestions = selectBalancedQuestions(
    questions,
    QUIZ_CONFIG.questionsPerQuiz
  );

  // Convert to diagnostic format
  const diagnosticQuestions = selectedQuestions.map(toDiagnosticQuestion);

  // Get course info for title
  const course = COURSES[courseId];
  const sectionInfo = course?.sections.find(s => s.id === section);
  const sectionName = sectionInfo?.name || section;

  return {
    courseId,
    section,
    title: `${section} Diagnostic Assessment`,
    description: `Assess your readiness for ${sectionName}`,
    timeLimit: QUIZ_CONFIG.timeLimit,
    passingScore: QUIZ_CONFIG.passingScore,
    questions: diagnosticQuestions,
  };
}

/**
 * Get available sections for a course's diagnostic quizzes
 */
export function getAvailableSections(courseId: CourseId): string[] {
  const course = COURSES[courseId];
  if (!course) return [];
  return course.sections.map(s => s.id);
}

/**
 * Get area name for display
 */
export function getAreaName(courseId: CourseId, area: string): string {
  return AREA_NAMES[courseId]?.[area] || area;
}
