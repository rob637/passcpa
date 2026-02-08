/**
 * CISA Exam Simulator Service
 * 
 * Provides realistic CISA exam simulation experience:
 * - 150 questions in 4 hours (same as real exam)
 * - Domain-weighted question distribution
 * - Timer with pause functionality
 * - Progress tracking and review mode
 * - Detailed results analysis
 */

import { CISASectionId } from '../courses/cisa/config';

// Exam configuration matching ISACA CISA exam
export const CISA_EXAM_CONFIG = {
  totalQuestions: 150,
  timeLimit: 240, // 4 hours in minutes
  passingScore: 450, // Scaled score (out of 800)
  passingPercentage: 65, // Approximate raw percentage needed
  domainDistribution: {
    CISA1: 27, // 18% of 150
    CISA2: 27, // 18% of 150
    CISA3: 18, // 12% of 150
    CISA4: 39, // 26% of 150
    CISA5: 39, // 26% of 150
  } as Record<CISASectionId, number>,
};

export interface ExamQuestion {
  id: string;
  domain: CISASectionId;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isacaRef?: string;
}

export interface ExamAnswer {
  questionId: string;
  selectedAnswer: number | null;
  timeSpent: number; // seconds
  flagged: boolean;
}

export interface ExamSession {
  id: string;
  startTime: Date;
  endTime: Date | null;
  status: 'in-progress' | 'completed' | 'paused' | 'abandoned';
  questions: ExamQuestion[];
  answers: Map<string, ExamAnswer>;
  currentQuestionIndex: number;
  timeRemaining: number; // seconds
  pausedAt: Date | null;
  totalPauseDuration: number; // seconds
}

export interface ExamResult {
  sessionId: string;
  completedAt: Date;
  totalQuestions: number;
  questionsAnswered: number;
  correctAnswers: number;
  rawScore: number; // percentage
  scaledScore: number; // ISACA scaled score (200-800)
  passed: boolean;
  timeUsed: number; // minutes
  domainResults: Record<CISASectionId, {
    total: number;
    correct: number;
    percentage: number;
    passed: boolean;
  }>;
  weakDomains: CISASectionId[];
  strongDomains: CISASectionId[];
  questionAnalysis: {
    questionId: string;
    domain: CISASectionId;
    correct: boolean;
    timeSpent: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
}

// Storage keys
const SESSION_KEY = 'cisa-exam-session';
const RESULTS_KEY = 'cisa-exam-results';

// Module state
let currentSession: ExamSession | null = null;

/**
 * Load session from storage
 */
function loadSession(): ExamSession | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.startTime = new Date(parsed.startTime);
      if (parsed.endTime) parsed.endTime = new Date(parsed.endTime);
      if (parsed.pausedAt) parsed.pausedAt = new Date(parsed.pausedAt);
      parsed.answers = new Map(parsed.answers);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load exam session:', e);
  }
  return null;
}

/**
 * Save session to storage
 */
function saveSession(session: ExamSession): void {
  try {
    const toStore = {
      ...session,
      answers: Array.from(session.answers.entries()),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save exam session:', e);
  }
}

/**
 * Clear session from storage
 */
function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  currentSession = null;
}

/**
 * Load previous results
 */
export function loadPreviousResults(): ExamResult[] {
  try {
    const stored = localStorage.getItem(RESULTS_KEY);
    if (stored) {
      const results = JSON.parse(stored);
      return results.map((r: ExamResult) => ({
        ...r,
        completedAt: new Date(r.completedAt),
      }));
    }
  } catch (e) {
    console.error('Failed to load exam results:', e);
  }
  return [];
}

/**
 * Save result
 */
function saveResult(result: ExamResult): void {
  try {
    const existing = loadPreviousResults();
    existing.push(result);
    // Keep only last 10 results
    const toKeep = existing.slice(-10);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(toKeep));
  } catch (e) {
    console.error('Failed to save exam result:', e);
  }
}

/**
 * Generate unique session ID
 */
function generateSessionId(): string {
  return `cisa-exam-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select questions for exam (domain-weighted)
 */
function selectExamQuestions(allQuestions: ExamQuestion[]): ExamQuestion[] {
  const selected: ExamQuestion[] = [];
  const { domainDistribution } = CISA_EXAM_CONFIG;
  
  // Group questions by domain
  const byDomain: Record<CISASectionId, ExamQuestion[]> = {
    CISA1: [],
    CISA2: [],
    CISA3: [],
    CISA4: [],
    CISA5: [],
  };
  
  allQuestions.forEach(q => {
    if (byDomain[q.domain]) {
      byDomain[q.domain].push(q);
    }
  });
  
  // Select required number from each domain
  Object.entries(domainDistribution).forEach(([domain, count]) => {
    const domainId = domain as CISASectionId;
    const domainQuestions = shuffleArray(byDomain[domainId]);
    const toSelect = domainQuestions.slice(0, count);
    
    // If not enough questions, log warning
    if (toSelect.length < count) {
      console.warn(`Only ${toSelect.length}/${count} questions available for ${domain}`);
    }
    
    selected.push(...toSelect);
  });
  
  // Shuffle final selection
  return shuffleArray(selected);
}

/**
 * Start a new exam session
 */
export function startExam(allQuestions: ExamQuestion[]): ExamSession {
  const questions = selectExamQuestions(allQuestions);
  
  const session: ExamSession = {
    id: generateSessionId(),
    startTime: new Date(),
    endTime: null,
    status: 'in-progress',
    questions,
    answers: new Map(),
    currentQuestionIndex: 0,
    timeRemaining: CISA_EXAM_CONFIG.timeLimit * 60, // Convert to seconds
    pausedAt: null,
    totalPauseDuration: 0,
  };
  
  // Initialize answers
  questions.forEach(q => {
    session.answers.set(q.id, {
      questionId: q.id,
      selectedAnswer: null,
      timeSpent: 0,
      flagged: false,
    });
  });
  
  currentSession = session;
  saveSession(session);
  
  return session;
}

/**
 * Resume existing session
 */
export function resumeExam(): ExamSession | null {
  if (currentSession) return currentSession;
  
  const loaded = loadSession();
  if (loaded && loaded.status === 'paused') {
    loaded.status = 'in-progress';
    loaded.pausedAt = null;
    currentSession = loaded;
    saveSession(loaded);
    return loaded;
  }
  
  return null;
}

/**
 * Get current session
 */
export function getCurrentSession(): ExamSession | null {
  if (!currentSession) {
    currentSession = loadSession();
  }
  return currentSession;
}

/**
 * Pause exam
 */
export function pauseExam(): void {
  if (currentSession && currentSession.status === 'in-progress') {
    currentSession.status = 'paused';
    currentSession.pausedAt = new Date();
    saveSession(currentSession);
  }
}

/**
 * Update answer for a question
 */
export function updateAnswer(
  questionId: string, 
  selectedAnswer: number | null,
  timeSpent: number
): void {
  if (!currentSession) return;
  
  const answer = currentSession.answers.get(questionId);
  if (answer) {
    answer.selectedAnswer = selectedAnswer;
    answer.timeSpent += timeSpent;
    saveSession(currentSession);
  }
}

/**
 * Toggle flag on a question
 */
export function toggleFlag(questionId: string): boolean {
  if (!currentSession) return false;
  
  const answer = currentSession.answers.get(questionId);
  if (answer) {
    answer.flagged = !answer.flagged;
    saveSession(currentSession);
    return answer.flagged;
  }
  return false;
}

/**
 * Navigate to question
 */
export function goToQuestion(index: number): void {
  if (currentSession && index >= 0 && index < currentSession.questions.length) {
    currentSession.currentQuestionIndex = index;
    saveSession(currentSession);
  }
}

/**
 * Update time remaining
 */
export function updateTimeRemaining(seconds: number): void {
  if (currentSession) {
    currentSession.timeRemaining = Math.max(0, seconds);
    
    // Auto-submit if time runs out
    if (currentSession.timeRemaining === 0) {
      submitExam();
    } else {
      saveSession(currentSession);
    }
  }
}

/**
 * Get flagged questions
 */
export function getFlaggedQuestions(): number[] {
  if (!currentSession) return [];
  
  const flagged: number[] = [];
  currentSession.questions.forEach((q, index) => {
    const answer = currentSession!.answers.get(q.id);
    if (answer?.flagged) {
      flagged.push(index);
    }
  });
  return flagged;
}

/**
 * Get unanswered questions
 */
export function getUnansweredQuestions(): number[] {
  if (!currentSession) return [];
  
  const unanswered: number[] = [];
  currentSession.questions.forEach((q, index) => {
    const answer = currentSession!.answers.get(q.id);
    if (answer?.selectedAnswer === null) {
      unanswered.push(index);
    }
  });
  return unanswered;
}

/**
 * Calculate scaled score (ISACA uses 200-800 scale)
 */
function calculateScaledScore(rawPercentage: number): number {
  // ISACA scoring is not linear - this is an approximation
  // Passing is typically around 65% raw = 450 scaled
  const minScore = 200;
  const maxScore = 800;
  const passingRaw = 0.65;
  const passingScaled = 450;
  
  if (rawPercentage <= passingRaw) {
    // Below passing: linear from 200 to 450
    return Math.round(minScore + (rawPercentage / passingRaw) * (passingScaled - minScore));
  } else {
    // Above passing: linear from 450 to 800
    return Math.round(passingScaled + ((rawPercentage - passingRaw) / (1 - passingRaw)) * (maxScore - passingScaled));
  }
}

/**
 * Submit exam and calculate results
 */
export function submitExam(): ExamResult | null {
  if (!currentSession) return null;
  
  currentSession.status = 'completed';
  currentSession.endTime = new Date();
  
  // Calculate results
  const domainResults: Record<CISASectionId, { total: number; correct: number; percentage: number; passed: boolean }> = {
    CISA1: { total: 0, correct: 0, percentage: 0, passed: false },
    CISA2: { total: 0, correct: 0, percentage: 0, passed: false },
    CISA3: { total: 0, correct: 0, percentage: 0, passed: false },
    CISA4: { total: 0, correct: 0, percentage: 0, passed: false },
    CISA5: { total: 0, correct: 0, percentage: 0, passed: false },
  };
  
  const questionAnalysis: ExamResult['questionAnalysis'] = [];
  let totalCorrect = 0;
  let totalAnswered = 0;
  
  currentSession.questions.forEach(q => {
    const answer = currentSession!.answers.get(q.id);
    const isCorrect = answer?.selectedAnswer === q.correctAnswer;
    
    domainResults[q.domain].total++;
    if (answer?.selectedAnswer !== null) {
      totalAnswered++;
      if (isCorrect) {
        totalCorrect++;
        domainResults[q.domain].correct++;
      }
    }
    
    questionAnalysis.push({
      questionId: q.id,
      domain: q.domain,
      correct: isCorrect,
      timeSpent: answer?.timeSpent || 0,
      difficulty: q.difficulty,
    });
  });
  
  // Calculate domain percentages
  Object.values(domainResults).forEach(dr => {
    dr.percentage = dr.total > 0 ? Math.round((dr.correct / dr.total) * 100) : 0;
    dr.passed = dr.percentage >= 60; // Domain passing threshold
  });
  
  // Calculate overall scores
  const rawScore = currentSession.questions.length > 0 
    ? (totalCorrect / currentSession.questions.length) * 100 
    : 0;
  const scaledScore = calculateScaledScore(rawScore / 100);
  const passed = scaledScore >= CISA_EXAM_CONFIG.passingScore;
  
  // Identify weak and strong domains
  const weakDomains = (Object.entries(domainResults) as [CISASectionId, typeof domainResults[CISASectionId]][])
    .filter(([, dr]) => dr.percentage < 60)
    .map(([domain]) => domain);
  
  const strongDomains = (Object.entries(domainResults) as [CISASectionId, typeof domainResults[CISASectionId]][])
    .filter(([, dr]) => dr.percentage >= 75)
    .map(([domain]) => domain);
  
  const timeUsed = Math.round(
    (CISA_EXAM_CONFIG.timeLimit * 60 - currentSession.timeRemaining) / 60
  );
  
  const result: ExamResult = {
    sessionId: currentSession.id,
    completedAt: currentSession.endTime,
    totalQuestions: currentSession.questions.length,
    questionsAnswered: totalAnswered,
    correctAnswers: totalCorrect,
    rawScore: Math.round(rawScore),
    scaledScore,
    passed,
    timeUsed,
    domainResults,
    weakDomains,
    strongDomains,
    questionAnalysis,
  };
  
  // Save result and clear session
  saveResult(result);
  clearSession();
  
  return result;
}

/**
 * Abandon exam without scoring
 */
export function abandonExam(): void {
  if (currentSession) {
    currentSession.status = 'abandoned';
    currentSession.endTime = new Date();
    saveSession(currentSession);
    clearSession();
  }
}

/**
 * Get exam statistics
 */
export function getExamStatistics(): {
  totalExams: number;
  passedExams: number;
  averageScore: number;
  bestScore: number;
  averageTime: number;
  improvement: number;
} {
  const results = loadPreviousResults();
  
  if (results.length === 0) {
    return {
      totalExams: 0,
      passedExams: 0,
      averageScore: 0,
      bestScore: 0,
      averageTime: 0,
      improvement: 0,
    };
  }
  
  const scores = results.map(r => r.scaledScore);
  const passedExams = results.filter(r => r.passed).length;
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const bestScore = Math.max(...scores);
  const averageTime = Math.round(
    results.reduce((sum, r) => sum + r.timeUsed, 0) / results.length
  );
  
  // Calculate improvement (last 3 vs first 3)
  let improvement = 0;
  if (results.length >= 3) {
    const first3Avg = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const last3Avg = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
    improvement = Math.round(last3Avg - first3Avg);
  }
  
  return {
    totalExams: results.length,
    passedExams,
    averageScore,
    bestScore,
    averageTime,
    improvement,
  };
}

/**
 * Get domain-level analytics across all exams
 */
export function getDomainAnalytics(): Record<CISASectionId, {
  averageScore: number;
  trend: 'improving' | 'stable' | 'declining';
  examCount: number;
}> {
  const results = loadPreviousResults();
  const analytics: Record<CISASectionId, { scores: number[]; averageScore: number; trend: 'improving' | 'stable' | 'declining'; examCount: number }> = {
    CISA1: { scores: [], averageScore: 0, trend: 'stable', examCount: 0 },
    CISA2: { scores: [], averageScore: 0, trend: 'stable', examCount: 0 },
    CISA3: { scores: [], averageScore: 0, trend: 'stable', examCount: 0 },
    CISA4: { scores: [], averageScore: 0, trend: 'stable', examCount: 0 },
    CISA5: { scores: [], averageScore: 0, trend: 'stable', examCount: 0 },
  };
  
  results.forEach(result => {
    Object.entries(result.domainResults).forEach(([domain, dr]) => {
      const domainId = domain as CISASectionId;
      analytics[domainId].scores.push(dr.percentage);
      analytics[domainId].examCount++;
    });
  });
  
  // Calculate averages and trends
  Object.values(analytics).forEach(da => {
    if (da.scores.length > 0) {
      da.averageScore = Math.round(da.scores.reduce((a, b) => a + b, 0) / da.scores.length);
      
      if (da.scores.length >= 3) {
        const first = da.scores.slice(0, Math.ceil(da.scores.length / 2));
        const second = da.scores.slice(Math.ceil(da.scores.length / 2));
        const firstAvg = first.reduce((a, b) => a + b, 0) / first.length;
        const secondAvg = second.reduce((a, b) => a + b, 0) / second.length;
        
        if (secondAvg > firstAvg + 5) da.trend = 'improving';
        else if (secondAvg < firstAvg - 5) da.trend = 'declining';
      }
    }
  });
  
  return analytics;
}
