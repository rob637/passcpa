/**
 * Diagnostic Quiz Types
 * Shared types for the diagnostic assessment feature across all exams.
 */
import type { CourseId } from './course';

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  blueprintArea: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface DiagnosticQuiz {
  courseId: CourseId;
  section: string; // e.g. 'FAR', 'SEE1', 'CISA' (for single-exam courses)
  title: string;
  description: string;
  timeLimit: number; // minutes
  passingScore: number; // percentage
  questions: DiagnosticQuestion[];
}

export interface DiagnosticAreaScore {
  area: string;
  areaName: string;
  score: number;
  total: number;
  percentage: number;
}

export interface DiagnosticResult {
  courseId: CourseId;
  section: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  areaScores: DiagnosticAreaScore[];
  weakAreas: DiagnosticAreaScore[];
  strongAreas: DiagnosticAreaScore[];
  recommendations: string[];
  completedAt: Date;
  timeSpentSeconds: number;
}

/**
 * Score a diagnostic quiz given user answers.
 * Returns detailed results with per-area breakdown.
 */
export function scoreDiagnosticQuiz(
  quiz: DiagnosticQuiz,
  answers: (number | null)[],
  timeSpentSeconds: number,
  areaNames: Record<string, string> = {}
): DiagnosticResult {
  const areaScoresMap: Record<string, { correct: number; total: number }> = {};
  let correct = 0;

  quiz.questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.correctAnswer;
    if (isCorrect) correct++;

    if (!areaScoresMap[q.blueprintArea]) {
      areaScoresMap[q.blueprintArea] = { correct: 0, total: 0 };
    }
    areaScoresMap[q.blueprintArea].total++;
    if (isCorrect) areaScoresMap[q.blueprintArea].correct++;
  });

  const percentage = Math.round((correct / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScore;

  const areaScores: DiagnosticAreaScore[] = Object.entries(areaScoresMap).map(
    ([area, scores]) => ({
      area,
      areaName: areaNames[area] || area,
      score: scores.correct,
      total: scores.total,
      percentage: Math.round((scores.correct / scores.total) * 100),
    })
  );

  const weakAreas = areaScores.filter((a) => a.percentage < 70);
  const strongAreas = areaScores.filter((a) => a.percentage >= 80);

  const recommendations: string[] = [];
  if (!passed) {
    recommendations.push(
      'Focus on fundamentals before attempting full practice exams.'
    );
  }
  weakAreas.forEach((wa) => {
    recommendations.push(
      `Review ${wa.areaName}: scored ${wa.score}/${wa.total} (${wa.percentage}%)`
    );
  });
  if (passed && weakAreas.length === 0) {
    recommendations.push(
      'Strong foundation! Focus on timed practice and exam simulation.'
    );
  }

  return {
    courseId: quiz.courseId,
    section: quiz.section,
    score: correct,
    totalQuestions: quiz.questions.length,
    percentage,
    passed,
    areaScores,
    weakAreas,
    strongAreas,
    recommendations,
    completedAt: new Date(),
    timeSpentSeconds,
  };
}
