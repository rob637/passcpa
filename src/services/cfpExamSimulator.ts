/**
 * CFP Exam Simulation Service
 * 
 * Provides a realistic CFP exam experience with:
 * - 170 questions in 3-hour timed session
 * - Item sets (scenario-based multi-question sets)
 * - Question flagging for review
 * - Optional scheduled breaks
 * - Section navigation
 * - Results analysis
 */

// Exam Configuration
export const CFP_EXAM_CONFIG = {
  totalQuestions: 170,
  timeLimit: 180, // minutes (3 hours)
  itemSetCount: 2, // Number of item sets (typically 8-12 questions each)
  passingScore: 0.70, // Estimated passing threshold
  breakAfterQuestion: 85, // Optional break halfway
  breakDuration: 15, // minutes
};

// Types
interface QuestionOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  courseId?: string;
  domain: string;
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  itemSetId?: string;
  itemSetTitle?: string;
  itemSetScenario?: string;
  questionNumber: number;
  sectionNumber: number;
}

export interface ExamAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isFlagged: boolean;
  timeSpent: number; // seconds
  answeredAt: Date | null;
}

export interface ExamSection {
  id: string;
  title: string;
  startQuestion: number;
  endQuestion: number;
  questions: ExamQuestion[];
}

export interface ExamState {
  id: string;
  examId: string;
  examTitle: string;
  status: 'not-started' | 'in-progress' | 'paused' | 'break' | 'completed' | 'reviewed';
  startedAt: Date | null;
  completedAt: Date | null;
  pausedAt: Date | null;
  currentQuestionIndex: number;
  timeRemaining: number; // seconds
  timeElapsed: number; // seconds
  breaksTaken: number;
  sections: ExamSection[];
  answers: Map<string, ExamAnswer>;
  flaggedQuestions: Set<string>;
}

export interface ExamResults {
  examId: string;
  examTitle: string;
  completedAt: Date;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number; // percentage
  passed: boolean;
  timeUsed: number; // seconds
  averageTimePerQuestion: number; // seconds
  domainScores: DomainScore[];
  flaggedReview: FlaggedQuestion[];
  questionDetails: QuestionResult[];
}

export interface DomainScore {
  domain: string;
  domainName: string;
  correct: number;
  total: number;
  percentage: number;
  status: 'strong' | 'moderate' | 'weak';
}

export interface FlaggedQuestion {
  questionId: string;
  questionNumber: number;
  wasCorrect: boolean;
  selectedAnswer: string | null;
  correctAnswer: string;
}

export interface QuestionResult {
  questionId: string;
  questionNumber: number;
  domain: string;
  wasCorrect: boolean;
  selectedOptionId: string | null;
  correctOptionId: string;
  timeSpent: number;
  wasFlagged: boolean;
}

// Domain name mapping
const DOMAIN_NAMES: Record<string, string> = {
  'GEN': 'General Principles',
  'RISK': 'Risk Management & Insurance',
  'INV': 'Investment Planning',
  'TAX': 'Tax Planning',
  'RET': 'Retirement Planning',
  'EST': 'Estate Planning',
  'PRO': 'Professional Conduct',
};

/**
 * Create a new exam simulation state
 */
export function createExamState(
  examId: string,
  examTitle: string,
  sections: ExamSection[]
): ExamState {
  return {
    id: `sim-${Date.now()}`,
    examId,
    examTitle,
    status: 'not-started',
    startedAt: null,
    completedAt: null,
    pausedAt: null,
    currentQuestionIndex: 0,
    timeRemaining: CFP_EXAM_CONFIG.timeLimit * 60,
    timeElapsed: 0,
    breaksTaken: 0,
    sections,
    answers: new Map(),
    flaggedQuestions: new Set(),
  };
}

/**
 * Start the exam simulation
 */
export function startExam(state: ExamState): ExamState {
  return {
    ...state,
    status: 'in-progress',
    startedAt: new Date(),
    timeRemaining: CFP_EXAM_CONFIG.timeLimit * 60,
  };
}

/**
 * Pause the exam
 */
export function pauseExam(state: ExamState): ExamState {
  return {
    ...state,
    status: 'paused',
    pausedAt: new Date(),
  };
}

/**
 * Resume the exam from pause
 */
export function resumeExam(state: ExamState): ExamState {
  return {
    ...state,
    status: 'in-progress',
    pausedAt: null,
  };
}

/**
 * Take a scheduled break
 */
export function takeBreak(state: ExamState): ExamState {
  return {
    ...state,
    status: 'break',
    breaksTaken: state.breaksTaken + 1,
  };
}

/**
 * End break and resume
 */
export function endBreak(state: ExamState): ExamState {
  return {
    ...state,
    status: 'in-progress',
  };
}

/**
 * Navigate to a specific question
 */
export function goToQuestion(state: ExamState, questionIndex: number): ExamState {
  const totalQuestions = state.sections.reduce((sum, s) => sum + s.questions.length, 0);
  const clampedIndex = Math.max(0, Math.min(questionIndex, totalQuestions - 1));
  
  return {
    ...state,
    currentQuestionIndex: clampedIndex,
  };
}

/**
 * Go to next question
 */
export function nextQuestion(state: ExamState): ExamState {
  return goToQuestion(state, state.currentQuestionIndex + 1);
}

/**
 * Go to previous question
 */
export function previousQuestion(state: ExamState): ExamState {
  return goToQuestion(state, state.currentQuestionIndex - 1);
}

/**
 * Answer a question
 */
export function answerQuestion(
  state: ExamState,
  questionId: string,
  selectedOptionId: string,
  timeSpent: number
): ExamState {
  const existingAnswer = state.answers.get(questionId);
  const newAnswer: ExamAnswer = {
    questionId,
    selectedOptionId,
    isFlagged: existingAnswer?.isFlagged || false,
    timeSpent: (existingAnswer?.timeSpent || 0) + timeSpent,
    answeredAt: new Date(),
  };
  
  const newAnswers = new Map(state.answers);
  newAnswers.set(questionId, newAnswer);
  
  return {
    ...state,
    answers: newAnswers,
  };
}

/**
 * Clear an answer
 */
export function clearAnswer(state: ExamState, questionId: string): ExamState {
  const existingAnswer = state.answers.get(questionId);
  if (!existingAnswer) return state;
  
  const newAnswers = new Map(state.answers);
  newAnswers.set(questionId, {
    ...existingAnswer,
    selectedOptionId: null,
    answeredAt: null,
  });
  
  return {
    ...state,
    answers: newAnswers,
  };
}

/**
 * Toggle flag on a question
 */
export function toggleFlag(state: ExamState, questionId: string): ExamState {
  const newFlagged = new Set(state.flaggedQuestions);
  
  if (newFlagged.has(questionId)) {
    newFlagged.delete(questionId);
  } else {
    newFlagged.add(questionId);
  }
  
  // Update answer record too
  const existingAnswer = state.answers.get(questionId);
  if (existingAnswer) {
    const newAnswers = new Map(state.answers);
    newAnswers.set(questionId, {
      ...existingAnswer,
      isFlagged: newFlagged.has(questionId),
    });
    return {
      ...state,
      answers: newAnswers,
      flaggedQuestions: newFlagged,
    };
  }
  
  return {
    ...state,
    flaggedQuestions: newFlagged,
  };
}

/**
 * Update time remaining (called by timer)
 */
export function updateTime(state: ExamState, secondsElapsed: number): ExamState {
  const newTimeRemaining = Math.max(0, state.timeRemaining - secondsElapsed);
  const newTimeElapsed = state.timeElapsed + secondsElapsed;
  
  // Auto-submit if time runs out
  if (newTimeRemaining === 0 && state.status === 'in-progress') {
    return {
      ...state,
      timeRemaining: 0,
      timeElapsed: newTimeElapsed,
      status: 'completed',
      completedAt: new Date(),
    };
  }
  
  return {
    ...state,
    timeRemaining: newTimeRemaining,
    timeElapsed: newTimeElapsed,
  };
}

/**
 * Submit the exam
 */
export function submitExam(state: ExamState): ExamState {
  return {
    ...state,
    status: 'completed',
    completedAt: new Date(),
  };
}

/**
 * Get current question from state
 */
export function getCurrentQuestion(state: ExamState): ExamQuestion | null {
  let questionIndex = 0;
  
  for (const section of state.sections) {
    for (const question of section.questions) {
      if (questionIndex === state.currentQuestionIndex) {
        return question;
      }
      questionIndex++;
    }
  }
  
  return null;
}

/**
 * Get all questions flattened
 */
export function getAllQuestions(state: ExamState): ExamQuestion[] {
  return state.sections.flatMap(s => s.questions);
}

/**
 * Get exam progress stats
 */
export function getProgress(state: ExamState): {
  answered: number;
  unanswered: number;
  flagged: number;
  total: number;
  percentComplete: number;
} {
  const allQuestions = getAllQuestions(state);
  const total = allQuestions.length;
  const answered = Array.from(state.answers.values()).filter(a => a.selectedOptionId !== null).length;
  const flagged = state.flaggedQuestions.size;
  
  return {
    answered,
    unanswered: total - answered,
    flagged,
    total,
    percentComplete: Math.round((answered / total) * 100),
  };
}

/**
 * Calculate exam results
 */
export function calculateResults(
  state: ExamState,
  questions: ExamQuestion[]
): ExamResults {
  const questionResults: QuestionResult[] = [];
  const domainStats: Record<string, { correct: number; total: number }> = {};
  const flaggedReview: FlaggedQuestion[] = [];
  
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let totalTimeSpent = 0;
  
  // Process each question
  questions.forEach((question, index) => {
    const answer = state.answers.get(question.id);
    const selectedOptionId = answer?.selectedOptionId || null;
    const correctOptionId = question.correctOptionId;
    const wasCorrect = selectedOptionId === correctOptionId;
    const wasFlagged = state.flaggedQuestions.has(question.id);
    const timeSpent = answer?.timeSpent || 0;
    
    totalTimeSpent += timeSpent;
    
    // Determine domain from question ID or property
    const domain = question.domain || question.id.split('-')[1] || 'GEN';
    
    // Initialize domain stats
    if (!domainStats[domain]) {
      domainStats[domain] = { correct: 0, total: 0 };
    }
    domainStats[domain].total++;
    
    if (selectedOptionId === null) {
      unansweredCount++;
    } else if (wasCorrect) {
      correctCount++;
      domainStats[domain].correct++;
    } else {
      incorrectCount++;
    }
    
    // Add to results
    questionResults.push({
      questionId: question.id,
      questionNumber: index + 1,
      domain,
      wasCorrect,
      selectedOptionId,
      correctOptionId,
      timeSpent,
      wasFlagged,
    });
    
    // Track flagged questions for review
    if (wasFlagged) {
      const selectedOption = question.options.find(o => o.id === selectedOptionId);
      const correctOption = question.options.find(o => o.id === correctOptionId);
      
      flaggedReview.push({
        questionId: question.id,
        questionNumber: index + 1,
        wasCorrect,
        selectedAnswer: selectedOption?.text || null,
        correctAnswer: correctOption?.text || '',
      });
    }
  });
  
  // Calculate domain scores
  const domainScores: DomainScore[] = Object.entries(domainStats).map(([domain, stats]) => {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    let status: 'strong' | 'moderate' | 'weak';
    
    if (percentage >= 80) {
      status = 'strong';
    } else if (percentage >= 65) {
      status = 'moderate';
    } else {
      status = 'weak';
    }
    
    return {
      domain,
      domainName: DOMAIN_NAMES[domain] || domain,
      correct: stats.correct,
      total: stats.total,
      percentage,
      status,
    };
  });
  
  // Sort by domain weight (approximate)
  const domainOrder = ['RET', 'GEN', 'PRO', 'TAX', 'EST', 'RISK', 'INV'];
  domainScores.sort((a, b) => {
    const aIndex = domainOrder.indexOf(a.domain);
    const bIndex = domainOrder.indexOf(b.domain);
    return aIndex - bIndex;
  });
  
  const totalQuestions = questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= CFP_EXAM_CONFIG.passingScore * 100;
  
  return {
    examId: state.examId,
    examTitle: state.examTitle,
    completedAt: state.completedAt || new Date(),
    totalQuestions,
    correctAnswers: correctCount,
    incorrectAnswers: incorrectCount,
    unanswered: unansweredCount,
    score,
    passed,
    timeUsed: state.timeElapsed,
    averageTimePerQuestion: totalQuestions > 0 ? Math.round(totalTimeSpent / totalQuestions) : 0,
    domainScores,
    flaggedReview,
    questionDetails: questionResults,
  };
}

/**
 * Format time remaining for display
 */
export function formatTimeRemaining(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get question status for navigation panel
 */
export function getQuestionStatus(
  state: ExamState,
  questionId: string
): 'unanswered' | 'answered' | 'flagged' | 'answered-flagged' | 'current' {
  const currentQuestion = getCurrentQuestion(state);
  const isCurrent = currentQuestion?.id === questionId;
  const isFlagged = state.flaggedQuestions.has(questionId);
  const answer = state.answers.get(questionId);
  const isAnswered = answer?.selectedOptionId !== null && answer?.selectedOptionId !== undefined;
  
  if (isCurrent) return 'current';
  if (isAnswered && isFlagged) return 'answered-flagged';
  if (isFlagged) return 'flagged';
  if (isAnswered) return 'answered';
  return 'unanswered';
}

/**
 * Check if break is available
 */
export function isBreakAvailable(state: ExamState): boolean {
  const currentQ = state.currentQuestionIndex + 1;
  return (
    currentQ >= CFP_EXAM_CONFIG.breakAfterQuestion &&
    state.breaksTaken === 0 &&
    state.status === 'in-progress'
  );
}

/**
 * Get section for current question
 */
export function getCurrentSection(state: ExamState): ExamSection | null {
  let questionIndex = 0;
  
  for (const section of state.sections) {
    const sectionEnd = questionIndex + section.questions.length;
    if (state.currentQuestionIndex < sectionEnd) {
      return section;
    }
    questionIndex = sectionEnd;
  }
  
  return null;
}

/**
 * Generate exam review data
 */
export function generateReviewData(
  results: ExamResults,
  questions: ExamQuestion[]
): {
  incorrectQuestions: Array<ExamQuestion & { selectedOptionId: string | null }>;
  weakDomains: DomainScore[];
  recommendations: string[];
} {
  // Get incorrect questions with details
  const incorrectQuestions = results.questionDetails
    .filter(r => !r.wasCorrect && r.selectedOptionId !== null)
    .map(r => {
      const question = questions.find(q => q.id === r.questionId)!;
      return {
        ...question,
        selectedOptionId: r.selectedOptionId,
      };
    });
  
  // Get weak domains
  const weakDomains = results.domainScores.filter(d => d.status === 'weak');
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (results.score < 60) {
    recommendations.push('Focus on building foundational knowledge across all domains before retaking.');
  } else if (results.score < 70) {
    recommendations.push('You are close to passing! Focus intensively on your weak domains.');
  }
  
  weakDomains.forEach(domain => {
    recommendations.push(`Review ${domain.domainName} lessons and practice questions (${domain.percentage}% correct).`);
  });
  
  if (results.unanswered > 0) {
    recommendations.push(`You left ${results.unanswered} questions unanswered. Always guess—there is no penalty.`);
  }
  
  const avgTime = results.averageTimePerQuestion;
  if (avgTime > 90) {
    recommendations.push('Work on time management. Target 60-70 seconds per question.');
  } else if (avgTime < 30) {
    recommendations.push('You may be rushing. Take time to read questions carefully.');
  }
  
  if (results.flaggedReview.filter(f => !f.wasCorrect).length > 5) {
    recommendations.push('Many flagged questions were incorrect. Trust your instincts more or review flagged areas.');
  }
  
  return {
    incorrectQuestions,
    weakDomains,
    recommendations,
  };
}

export default {
  CFP_EXAM_CONFIG,
  createExamState,
  startExam,
  pauseExam,
  resumeExam,
  takeBreak,
  endBreak,
  goToQuestion,
  nextQuestion,
  previousQuestion,
  answerQuestion,
  clearAnswer,
  toggleFlag,
  updateTime,
  submitExam,
  getCurrentQuestion,
  getAllQuestions,
  getProgress,
  calculateResults,
  formatTimeRemaining,
  getQuestionStatus,
  isBreakAvailable,
  getCurrentSection,
  generateReviewData,
};
