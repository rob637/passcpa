/**
 * Extract a curated subset of questions from TS source files into JSON for Discord bots.
 * 50 questions per exam (mixed difficulties, spread across sections).
 * Run: npx tsx scripts/discord_bots/extract_questions.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import all question banks
import { CISA_QUESTIONS } from '../../src/data/cisa/questions/index';
import { ALL_CIA1_QUESTIONS, ALL_CIA2_QUESTIONS, ALL_CIA3_QUESTIONS } from '../../src/data/cia/questions/index';

// CPA
import { default as CPA_ALL } from '../../src/data/cpa/questions/index';

// EA
import { EA_ALL_QUESTIONS } from '../../src/data/ea/questions/index';

// CMA
import { default as CMA_ALL } from '../../src/data/cma/questions/index';

// CFP
import { default as CFP_ALL } from '../../src/data/cfp/questions/index';

interface BotQuestion {
  id: string;
  exam: string;
  section: string;
  topic: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

function sanitizeQuestion(q: any, exam: string): BotQuestion | null {
  // Validate required fields
  if (!q.question || !q.options || q.options.length < 4 || q.correctAnswer === undefined) {
    return null;
  }
  // Skip questions with very long text (bad for Discord embeds)
  if (q.question.length > 500) return null;
  // Skip questions where any option is too long
  if (q.options.some((o: string) => o.length > 200)) return null;
  // Skip if explanation is missing or very short
  if (!q.explanation || q.explanation.length < 20) return null;

  return {
    id: q.id || `${exam}-${Math.random().toString(36).slice(2, 8)}`,
    exam: exam.toUpperCase(),
    section: q.section || '',
    topic: q.topic || '',
    difficulty: q.difficulty || 'medium',
    question: q.question,
    options: q.options.slice(0, 4),
    correctAnswer: q.correctAnswer,
    // Truncate explanation for Discord (max 1024 chars in embed field)
    explanation: q.explanation.length > 800 
      ? q.explanation.substring(0, 797) + '...' 
      : q.explanation,
  };
}

function selectCuratedSubset(questions: any[], exam: string, count: number = 50): BotQuestion[] {
  // Sanitize all questions
  const valid = questions
    .map(q => sanitizeQuestion(q, exam))
    .filter((q): q is BotQuestion => q !== null);

  console.log(`  ${exam.toUpperCase()}: ${questions.length} total → ${valid.length} valid`);

  if (valid.length <= count) return valid;

  // Group by section
  const bySection: Record<string, BotQuestion[]> = {};
  for (const q of valid) {
    const key = q.section || 'general';
    if (!bySection[key]) bySection[key] = [];
    bySection[key].push(q);
  }

  const sections = Object.keys(bySection);
  const perSection = Math.max(1, Math.floor(count / sections.length));
  const selected: BotQuestion[] = [];

  for (const section of sections) {
    const pool = bySection[section];
    // Try to get a mix of difficulties
    const easy = pool.filter(q => q.difficulty === 'easy');
    const medium = pool.filter(q => q.difficulty === 'medium');
    const hard = pool.filter(q => q.difficulty === 'hard');

    const pick = (arr: BotQuestion[], n: number): BotQuestion[] => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, n);
    };

    // Aim for 30% easy, 40% medium, 30% hard
    const easyCount = Math.max(1, Math.round(perSection * 0.3));
    const hardCount = Math.max(1, Math.round(perSection * 0.3));
    const medCount = perSection - easyCount - hardCount;

    selected.push(
      ...pick(easy, easyCount),
      ...pick(medium, medCount),
      ...pick(hard, hardCount),
    );
  }

  // If we're short, fill from remaining
  if (selected.length < count) {
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = valid.filter(q => !selectedIds.has(q.id));
    const shuffled = remaining.sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, count - selected.length));
  }

  // Shuffle final set
  return selected.sort(() => Math.random() - 0.5).slice(0, count);
}

// Main
const CIA_ALL = [...ALL_CIA1_QUESTIONS, ...ALL_CIA2_QUESTIONS, ...ALL_CIA3_QUESTIONS];

const examData: Record<string, any[]> = {
  cpa: CPA_ALL,
  ea: EA_ALL_QUESTIONS,
  cma: CMA_ALL,
  cia: CIA_ALL,
  cisa: CISA_QUESTIONS,
  cfp: CFP_ALL,
};

console.log('Extracting questions for quiz bots...\n');

const outputDir = path.join(__dirname, 'data');
fs.mkdirSync(outputDir, { recursive: true });

let totalExtracted = 0;
const summary: Record<string, number> = {};

// 200 per exam — enough for 6+ months of daily questions plus on-demand quizzes
const QUESTIONS_PER_EXAM = 200;

for (const [exam, questions] of Object.entries(examData)) {
  const subset = selectCuratedSubset(questions, exam, QUESTIONS_PER_EXAM);
  const outputPath = path.join(outputDir, `${exam}_questions.json`);
  fs.writeFileSync(outputPath, JSON.stringify(subset, null, 2));
  console.log(`  → Wrote ${subset.length} questions to ${exam}_questions.json`);
  totalExtracted += subset.length;
  summary[exam] = subset.length;
}

console.log(`\n✅ Done! ${totalExtracted} total questions extracted across ${Object.keys(examData).length} exams`);
console.log('Summary:', JSON.stringify(summary));
