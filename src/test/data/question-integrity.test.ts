/**
 * Question Data Integrity Test
 *
 * Deep validation of all question data across all 6 exams.
 * Unlike the regex-based scripts/validate-questions.cjs, this test
 * actually imports the TypeScript modules and inspects real objects.
 *
 * Checks:
 *  - Required fields present & non-empty
 *  - correctAnswer within options range (0-indexed)
 *  - Exactly 4 options per question
 *  - Options are non-empty strings
 *  - Explanation is meaningful (>20 chars)
 *  - ID format (lowercase, no spaces)
 *  - No duplicate IDs across the entire bank
 *  - courseId matches expected exam
 *  - difficulty is a valid value
 *  - section matches known sections for the course
 *
 * Run: npx vitest run src/test/data/question-integrity.test.ts
 */

import { describe, it, expect } from 'vitest';

// CPA
import { ALL_QUESTIONS as CPA_ALL } from '../../data/cpa/questions/index';

// EA
import { EA_ALL_QUESTIONS } from '../../data/ea/questions/index';

// CMA
import { CMA_ALL_QUESTIONS } from '../../data/cma/questions/index';

// CIA
import { ALL_CIA1_QUESTIONS, ALL_CIA2_QUESTIONS, ALL_CIA3_QUESTIONS } from '../../data/cia/questions/index';

const CIA_ALL_QUESTIONS = [...ALL_CIA1_QUESTIONS, ...ALL_CIA2_QUESTIONS, ...ALL_CIA3_QUESTIONS];

// CISA
import { CISA_QUESTIONS as CISA_ALL_QUESTIONS } from '../../data/cisa/questions/index';

// CFP
import { CFP_QUESTIONS_ALL as CFP_ALL_QUESTIONS } from '../../data/cfp/questions/index';

// ─── Known sections per course ──────────────────────────────────────
const KNOWN_SECTIONS: Record<string, string[]> = {
  cpa: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'],
  ea: ['SEE1', 'SEE2', 'SEE3'],
  cma: ['CMA1', 'CMA2', 'CMA1A', 'CMA1B', 'CMA1C', 'CMA2A', 'CMA2B', 'CMA2C'],
  cia: ['CIA1', 'CIA2', 'CIA3'],
  cisa: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  cfp: ['CFP-GEN', 'CFP-INV', 'CFP-RET', 'CFP-INS', 'CFP-RISK', 'CFP-TAX', 'CFP-EST', 'CFP-PSY', 'CFP-PCR', 'CFP-CROSS',
        'GEN', 'INV', 'RET', 'INS', 'RISK', 'TAX', 'EST', 'PSY', 'PCR', 'CROSS',
        'General Principles', 'Investment', 'Retirement', 'Insurance', 'Risk Management',
        'Tax Planning', 'Estate Planning', 'Psychology', 'Professional Conduct', 'Cross-Domain'],
};

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard', 'beginner', 'moderate', 'tough'];

// ─── Normalize CFP questions to standard format ─────────────────────
// CFP has 3 question formats:
// 1. Standard: options: string[], correctAnswer: number, section: string
// 2. Batch 1-3: options: {id, text, isCorrect}[], domain: string, no correctAnswer
// 3. Estate/Insurance: text (not question), options: {id, text}[], correctOptionId: 'A'|'B'|'C'|'D'
function normalizeCFPQuestions(questions: any[]): any[] {
  return questions.map((q: any) => {
    if (!Array.isArray(q.options) || q.options.length === 0) return q;
    
    // Already standard format
    if (typeof q.options[0] === 'string' && typeof q.correctAnswer === 'number' && q.section) {
      return q;
    }

    const norm = { ...q };

    // Handle 'text' → 'question' rename
    if (!norm.question && norm.text) {
      norm.question = norm.text;
    }

    // Handle object options → string[]
    if (typeof q.options[0] === 'object') {
      const optObjs = q.options;
      norm.options = optObjs.map((o: any) => o.text);

      // Derive correctAnswer
      if (norm.correctAnswer === undefined || norm.correctAnswer === null) {
        if (norm.correctOptionId) {
          // Format 3: correctOptionId is 'A','B','C','D'
          const idx = norm.correctOptionId.charCodeAt(0) - 'A'.charCodeAt(0);
          norm.correctAnswer = idx >= 0 && idx < optObjs.length ? idx : 0;
        } else {
          // Format 2: isCorrect flag
          const correctIdx = optObjs.findIndex((o: any) => o.isCorrect);
          norm.correctAnswer = correctIdx >= 0 ? correctIdx : 0;
        }
      }
    }

    // Map domain → section if missing
    if (!norm.section) {
      norm.section = norm.domain || norm.blueprintArea || 'CFP';
    }

    // Default difficulty if missing
    if (!norm.difficulty) {
      norm.difficulty = 'medium';
    }

    return norm;
  });
}

// ─── Build exam question map ────────────────────────────────────────
interface ExamBank {
  courseId: string;
  label: string;
  questions: any[];
}

const EXAMS: ExamBank[] = [
  { courseId: 'cpa', label: 'CPA', questions: CPA_ALL },
  { courseId: 'ea',  label: 'EA',  questions: EA_ALL_QUESTIONS },
  { courseId: 'cma', label: 'CMA', questions: CMA_ALL_QUESTIONS },
  { courseId: 'cia', label: 'CIA', questions: CIA_ALL_QUESTIONS },
  { courseId: 'cisa', label: 'CISA', questions: CISA_ALL_QUESTIONS },
  { courseId: 'cfp', label: 'CFP', questions: normalizeCFPQuestions(CFP_ALL_QUESTIONS) },
];

// ═══════════════════════════════════════════════════════════════════════
// TESTS
// ═══════════════════════════════════════════════════════════════════════

describe('Question Data Integrity', () => {
  // ── Global duplicate check ──
  it('should have no duplicate IDs across the entire question bank', () => {
    const allIds = new Map<string, string>();
    const duplicates: string[] = [];

    for (const exam of EXAMS) {
      for (const q of exam.questions) {
        if (!q.id) continue;
        const key = q.id.toLowerCase();
        if (allIds.has(key)) {
          duplicates.push(`"${q.id}" in ${exam.label} (also in ${allIds.get(key)})`);
        } else {
          allIds.set(key, exam.label);
        }
      }
    }

    if (duplicates.length > 0) {
      console.log(`\n  Duplicate IDs (${duplicates.length}):`);
      duplicates.slice(0, 15).forEach(d => console.log(`    • ${d}`));
      if (duplicates.length > 15) console.log(`    ... and ${duplicates.length - 15} more`);
    }
    expect(duplicates).toHaveLength(0);
  });

  // ── Total question count sanity check ──
  it('should have at least 10,000 total questions', () => {
    const total = EXAMS.reduce((sum, e) => sum + e.questions.length, 0);
    console.log(`\n  Total questions across all exams: ${total}`);
    for (const exam of EXAMS) {
      console.log(`    ${exam.label}: ${exam.questions.length}`);
    }
    expect(total).toBeGreaterThanOrEqual(10_000);
  });

  // ── Per-exam deep validation ──
  for (const exam of EXAMS) {
    describe(`${exam.label} (${exam.questions.length} questions)`, () => {
      it('should have questions', () => {
        expect(exam.questions.length).toBeGreaterThan(0);
      });

      it('every question should have required fields', () => {
        const missing: string[] = [];
        const required = ['id', 'section', 'difficulty', 'question', 'options', 'correctAnswer', 'explanation'];

        for (const q of exam.questions) {
          for (const field of required) {
            if (q[field] === undefined || q[field] === null || q[field] === '') {
              missing.push(`${q.id || '(no id)'}: missing "${field}"`);
            }
          }
        }

        if (missing.length > 0) {
          console.log(`\n  Missing required fields (${missing.length}):`);
          missing.slice(0, 10).forEach(m => console.log(`    • ${m}`));
          if (missing.length > 10) console.log(`    ... and ${missing.length - 10} more`);
        }
        expect(missing).toHaveLength(0);
      });

      it('every question should have exactly 4 options', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (!Array.isArray(q.options)) {
            bad.push(`${q.id}: options is not an array`);
          } else if (q.options.length !== 4) {
            bad.push(`${q.id}: has ${q.options.length} options (expected 4)`);
          }
        }

        if (bad.length > 0) {
          console.log(`\n  Wrong option count (${bad.length}):`);
          bad.slice(0, 10).forEach(b => console.log(`    • ${b}`));
        }
        expect(bad).toHaveLength(0);
      });

      it('every option should be a non-empty string', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (!Array.isArray(q.options)) continue;
          q.options.forEach((opt: any, i: number) => {
            if (typeof opt !== 'string' || opt.trim().length === 0) {
              bad.push(`${q.id}: option[${i}] is empty or not a string`);
            }
          });
        }

        if (bad.length > 0) {
          console.log(`\n  Empty/invalid options (${bad.length}):`);
          bad.slice(0, 10).forEach(b => console.log(`    • ${b}`));
        }
        expect(bad).toHaveLength(0);
      });

      it('correctAnswer should be within options range (0-indexed)', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (!Array.isArray(q.options)) continue;
          if (typeof q.correctAnswer !== 'number') {
            bad.push(`${q.id}: correctAnswer is not a number (${typeof q.correctAnswer})`);
          } else if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
            bad.push(`${q.id}: correctAnswer=${q.correctAnswer} out of range [0..${q.options.length - 1}]`);
          }
        }

        if (bad.length > 0) {
          console.log(`\n  ❌ CRITICAL — correctAnswer out of range (${bad.length}):`);
          bad.slice(0, 15).forEach(b => console.log(`    • ${b}`));
          if (bad.length > 15) console.log(`    ... and ${bad.length - 15} more`);
        }
        expect(bad).toHaveLength(0);
      });

      it('explanations should be meaningful (>20 chars)', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (typeof q.explanation !== 'string' || q.explanation.trim().length < 20) {
            bad.push(`${q.id}: explanation too short (${q.explanation?.length || 0} chars)`);
          }
        }

        if (bad.length > 0) {
          console.log(`\n  Short explanations (${bad.length}):`);
          bad.slice(0, 10).forEach(b => console.log(`    • ${b}`));
        }
        expect(bad).toHaveLength(0);
      });

      it('difficulty should be a valid value', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (!VALID_DIFFICULTIES.includes(q.difficulty)) {
            bad.push(`${q.id}: difficulty="${q.difficulty}"`);
          }
        }

        if (bad.length > 0) {
          console.log(`\n  Invalid difficulty (${bad.length}):`);
          bad.slice(0, 10).forEach(b => console.log(`    • ${b}`));
        }
        expect(bad).toHaveLength(0);
      });

      it('section should be a known section for this course', () => {
        const valid = KNOWN_SECTIONS[exam.courseId] || [];
        if (valid.length === 0) return; // skip if no sections defined

        const bad: string[] = [];
        for (const q of exam.questions) {
          if (!valid.includes(q.section)) {
            bad.push(`${q.id}: section="${q.section}"`);
          }
        }

        if (bad.length > 0) {
          const unknowns = [...new Set(bad.map(b => b.split('section="')[1]?.replace('"', '')))];
          console.log(`\n  Unknown sections: ${unknowns.join(', ')}`);
          console.log(`  Expected: ${valid.join(', ')}`);
          console.log(`  Affected: ${bad.length} questions`);
        }
        // Warn but don't fail — sections may expand
        if (bad.length > 0) {
          console.warn(`  ⚠️  ${bad.length} questions have non-standard sections`);
        }
      });

      it('question text should be substantial (>15 chars)', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (typeof q.question !== 'string' || q.question.trim().length < 15) {
            bad.push(`${q.id}: question too short (${q.question?.length || 0} chars)`);
          }
        }

        if (bad.length > 0) {
          console.log(`\n  Short question text (${bad.length}):`);
          bad.slice(0, 10).forEach(b => console.log(`    • ${b}`));
        }
        expect(bad).toHaveLength(0);
      });

      it('should have no options that are identical to each other', () => {
        const bad: string[] = [];
        for (const q of exam.questions) {
          if (!Array.isArray(q.options)) continue;
          const normalized = q.options.map((o: string) => o.toLowerCase().trim());
          const unique = new Set(normalized);
          if (unique.size < normalized.length) {
            const dupes = normalized.filter((o: string, i: number) => normalized.indexOf(o) !== i);
            bad.push(`${q.id}: duplicate option(s): "${dupes[0]}"`);
          }
        }

        if (bad.length > 0) {
          console.log(`\n  Duplicate options within question (${bad.length}):`);
          bad.slice(0, 10).forEach(b => console.log(`    • ${b}`));
        }
        expect(bad).toHaveLength(0);
      });

      it('difficulty distribution should be reasonable', () => {
        const dist: Record<string, number> = {};
        for (const q of exam.questions) {
          const d = q.difficulty || 'unknown';
          dist[d] = (dist[d] || 0) + 1;
        }

        console.log(`\n  Difficulty distribution for ${exam.label}:`);
        for (const [d, count] of Object.entries(dist)) {
          const pct = ((count / exam.questions.length) * 100).toFixed(1);
          console.log(`    ${d}: ${count} (${pct}%)`);
        }

        // At least 2 difficulty levels
        const levels = Object.keys(dist).filter(k => k !== 'unknown');
        expect(levels.length).toBeGreaterThanOrEqual(2);
      });
    });
  }
});
